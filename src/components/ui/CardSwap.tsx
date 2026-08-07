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
  onIndexChange?: (idx: number) => void;
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
  onIndexChange,
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
  const intervalRef = useRef<number | undefined>(undefined);
  const container = useRef<HTMLDivElement>(null);

  const isHoveredRef = useRef(false);

  useEffect(() => {
    const total = refs.length;
    // Reset order to match the current refs length (important when tab changes)
    order.current = Array.from({ length: total }, (_, i) => i);

    const cardCleanups: (() => void)[] = [];
    const cardHoverStates = new Map<number, boolean>();

    refs.forEach((r, idx) => {
      const el = r.current;
      if (!el) return;

      const onEnter = () => {
        if (order.current[0] === idx) {
          cardHoverStates.set(idx, true);
          const w = typeof width === 'number' ? width : parseFloat(width as string) || 525;
          const h = typeof height === 'number' ? height : parseFloat(height as string) || 400;

          // Animate card to absolute center with a 10% leftward bias
          gsap.to(el, {
            x: (0.05 - 0.10) * w, // -5% of container width (unbiased center minus 10% left shift)
            y: -0.1 * h,
            skewY: 0,
            scale: 1.2, // 1.2x zoom as requested
            zIndex: 999, // Ensure it floats on top of other elements
            duration: 0.45,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
      };

      const onLeave = () => {
        if (cardHoverStates.get(idx)) {
          cardHoverStates.set(idx, false);

          // Animate card back to original Slot 0 stack position
          gsap.to(el, {
            x: 0,
            y: 0,
            skewY: skewAmount,
            scale: 1,
            zIndex: total, // Reset to standard front slot zIndex
            duration: 0.45,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
      };

      const onClick = () => {
        const pos = order.current.indexOf(idx);
        if (pos > 0) {
          performSwap(idx, true);
        }
      };

      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
      el.addEventListener('click', onClick);

      cardCleanups.push(() => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        el.removeEventListener('click', onClick);
      });
    });

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

    const performSwap = (targetIdx: number, isRapid: boolean = false) => {
      if (order.current.length < 2) return;
      if (tlRef.current && tlRef.current.isActive()) return; // Block trigger if transition is active

      const pos = order.current.indexOf(targetIdx);
      if (pos <= 0) return;

      const dropCards = order.current.slice(0, pos);
      const slideCards = order.current.slice(pos);
      const newOrder = [...slideCards, ...dropCards];

      // Update logical order and notify parent immediately to sync details panel
      order.current = newOrder;
      onIndexChange?.(targetIdx);

      const tl = gsap.timeline();
      tlRef.current = tl;

      if (isRapid) {
        tl.timeScale(2.0); // 2.0x speed scale for smooth rapid cascade
      }

      // 1. Fade out text wrapper of all cards dropping to the back
      if (total > 2) {
        dropCards.forEach((idx) => {
          const el = refs[idx].current;
          const wrap = el?.querySelector('.card-content-wrap');
          if (wrap) {
            tl.to(wrap, { opacity: 0, duration: config.durDrop * 0.4, ease: 'power1.out' }, 0);
          }
        });
      }

      // 2. Animate front cards away based on transition style (shuffle for click/rapid, cascade for auto)
      dropCards.forEach((idx, i) => {
        const el = refs[idx].current;
        if (!el) return;

        if (isRapid) {
          // Shuffle slide outwards to the left
          tl.to(el, {
            x: `-=${180 + i * 40}`,
            y: `+=${40 + i * 20}`,
            rotationY: -45,
            scale: 0.9,
            duration: config.durDrop,
            ease: config.ease,
          }, i * 0.08);
        } else {
          // Default: cascade (drop down)
          tl.to(el, {
            y: '+=500',
            duration: config.durDrop,
            ease: config.ease,
          }, i * 0.08);
        }
      });

      // 3. Promote the clicked card and any cards behind it to their new slots
      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      slideCards.forEach((idx, i) => {
        const el = refs[idx].current;
        if (!el) return;
        const targetSlotIndex = i;
        const slot = makeSlot(targetSlotIndex, cardDistance, verticalDistance, refs.length);

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
          `promote+=${i * 0.12}`,
        );

        // Fade in text wrapper if card moves to Slot 0 or Slot 1
        if (total > 2 && targetSlotIndex < 2) {
          const wrap = el.querySelector('.card-content-wrap');
          if (wrap) {
            tl.to(wrap, { opacity: 1, duration: config.durMove * 0.7, ease: 'power1.inOut' }, `promote+=${i * 0.12}`);
          }
        }
      });

      // 4. Return all dropped cards to their new back slots
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      dropCards.forEach((idx, i) => {
        const el = refs[idx].current;
        if (!el) return;
        const targetSlotIndex = slideCards.length + i;
        const slot = makeSlot(targetSlotIndex, cardDistance, verticalDistance, refs.length);

        tl.call(
          () => {
            gsap.set(el, { zIndex: slot.zIndex });
          },
          undefined,
          'return',
        );

        if (isRapid) {
          tl.to(
            el,
            {
              x: slot.x,
              y: slot.y,
              z: slot.z,
              rotationY: 0,
              scale: 1,
              duration: config.durReturn,
              ease: config.ease,
            },
            'return',
          );
        } else {
          // Default: cascade (drop down)
          tl.to(
            el,
            {
              x: slot.x,
              y: slot.y,
              z: slot.z,
              duration: config.durReturn,
              ease: config.ease,
            },
            'return',
          );
        }
      });

      // 5. Schedule next normal auto-rotation when timeline finishes, if not hovered
      tl.call(() => {
        if (!isHoveredRef.current) {
          scheduleNext();
        }
      });
    };

    const swap = () => {
      if (order.current.length > 1) {
        performSwap(order.current[1], false);
      }
    };

    const scheduleNext = () => {
      clearInterval(intervalRef.current);
      intervalRef.current = window.setTimeout(swap, delay);
    };

    scheduleNext();

    if (pauseOnHover && container.current) {
      const node = container.current;
      const pause = () => {
        isHoveredRef.current = true;
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        isHoveredRef.current = false;
        if (!tlRef.current || !tlRef.current.isActive()) {
          scheduleNext();
        }
      };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        clearInterval(intervalRef.current);
        cardCleanups.forEach((c) => c());
      };
    }
    return () => {
      clearInterval(intervalRef.current);
      cardCleanups.forEach((c) => c());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, width, height, onCardClick, onIndexChange]);

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
