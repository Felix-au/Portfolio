import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import gsap from 'gsap';
import './CardSwap.css';

/* ──────────────────────────────────────────────────────────
   Card — thin wrapper that receives a forwarded ref from
   CardSwap so GSAP can animate it directly.
   ────────────────────────────────────────────────────────── */
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, className, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`card-swap-card ${customClass ?? ''} ${className ?? ''}`.trim()}
    />
  ),
);
Card.displayName = 'Card';

/* ──────────────────────────────────────────────────────────
   Internal helpers
   ────────────────────────────────────────────────────────── */
interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => {
  const N = total;
  if (N <= 4) {
    // Linear fallback if too few cards
    return {
      x: i * distX,
      y: -i * distY,
      z: -i * distX * 1.5,
      zIndex: N - i,
    };
  }

  const microStep = 0.08; // 8% offset so outlines are visible
  let val = i;

  if (i < 2) {
    val = i;
  } else if (i < N - 2) {
    // Middle cards stacked closely
    val = 2 + (i - 2) * microStep;
  } else {
    // Last and second-to-last cards spaced normally after the stack
    const smooshedEndVal = 2 + (N - 5) * microStep;
    const stepIndex = i - (N - 2); // 0 for N-2, 1 for N-1
    val = smooshedEndVal + 1 + stepIndex;
  }

  return {
    x: val * distX,
    y: -val * distY,
    z: -val * distX * 1.5,
    zIndex: N - i,
  };
};

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true,
  });

/* ──────────────────────────────────────────────────────────
   CardSwap
   ────────────────────────────────────────────────────────── */
interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: 'linear' | 'elastic';
  children: React.ReactNode;
}

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children,
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length],
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number>();
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => {
      if (r.current) {
        placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
        
        // Hide text content (opacity 0) for cards deeper than slot 1
        const wrap = r.current.querySelector('.card-content-wrap');
        if (wrap) {
          gsap.set(wrap, { opacity: i < 2 ? 1 : 0 });
        }
      }
    });

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      if (!elFront) return;

      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease,
      });

      // Fade out front card text wrapper if there are more than 2 cards
      if (total > 2) {
        const frontWrap = elFront.querySelector('.card-content-wrap');
        if (frontWrap) {
          tl.to(frontWrap, {
            opacity: 0,
            duration: config.durDrop * 0.4,
            ease: 'power1.out',
          }, 0);
        }
      }

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        if (!el) return;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`,
        );
      });

      // Fade in the text wrap of the card moving to slot 1 (idx at rest[1], which was slot 2)
      if (total > 2) {
        const nextVisibleCardIdx = rest[1];
        if (nextVisibleCardIdx !== undefined) {
          const nextVisibleEl = refs[nextVisibleCardIdx].current;
          const nextVisibleWrap = nextVisibleEl?.querySelector('.card-content-wrap');
          if (nextVisibleWrap) {
            tl.to(nextVisibleWrap, {
              opacity: 1,
              duration: config.durMove * 0.7,
              ease: 'power1.inOut',
            }, 'promote');
          }
        }
      }

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return',
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        'return',
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    intervalRef.current = window.setInterval(swap, delay);

    const cleanups: (() => void)[] = [];

    // Attach hover listeners to each card to float the active front card
    refs.forEach((ref, idx) => {
      const el = ref.current;
      if (!el) return;

      const onEnter = () => {
        // Only animate the card if it is currently at the front
        if (order.current[0] !== idx) return;

        const isDesktop = window.innerWidth > 768;
        gsap.to(el, {
          x: isDesktop ? -180 : 0,
          y: isDesktop ? 0 : -30,
          z: 150,
          scale: 1.1,
          skewY: 0,
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
          duration: 0.6,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      const onLeave = () => {
        // Reset only if it is the front card returning to slot 0
        if (order.current[0] !== idx) return;

        const slot = makeSlot(0, cardDistance, verticalDistance, refs.length);
        gsap.to(el, {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          scale: 1,
          skewY: skewAmount,
          boxShadow: 'none',
          duration: 0.6,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    });

    if (pauseOnHover && container.current) {
      const node = container.current;
      const pause = () => {
        // Clear interval so no NEW transitions are scheduled, but let active transitions run to completion
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      cleanups.push(() => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
      });
    }

    return () => {
      clearInterval(intervalRef.current);
      cleanups.forEach((c) => c());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child as React.ReactElement<CardProps & { style?: React.CSSProperties; onClick?: React.MouseEventHandler }>, {
          key: i,
          ref: refs[i],
          style: { width, height, ...((child as React.ReactElement<{ style?: React.CSSProperties }>).props.style ?? {}) },
          onClick: (e: React.MouseEvent) => {
            (child as React.ReactElement<{ onClick?: React.MouseEventHandler }>).props.onClick?.(e);
            onCardClick?.(i);
          },
        })
      : child,
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
};

export default CardSwap;
