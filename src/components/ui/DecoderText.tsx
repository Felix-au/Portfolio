import React, { useEffect, useRef } from 'react';
import { useSpring, useReducedMotion } from 'framer-motion';

const glyphs = [
  'ア', 'イ', 'ウ', 'エ', 'オ',
  'カ', 'キ', 'ク', 'ケ', 'コ',
  'サ', 'シ', 'ス', 'セ', 'ソ',
  'タ', 'チ', 'ツ', 'テ', 'ト',
  'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
  'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
  'マ', 'ミ', 'ム', 'メ', 'モ',
  'ヤ', 'ユ', 'ヨ', 'ー',
  'ラ', 'リ', 'ル', 'レ', 'ロ',
  'ワ', 'ヰ', 'ヱ', 'ヲ', 'ン',
];

interface DecoderTextProps {
  text: string;
  delay?: number;
  className?: string;
}

export const DecoderText: React.FC<DecoderTextProps> = ({ text, delay = 0, className = '' }) => {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const reduceMotion = useReducedMotion();
  const spring = useSpring(0, { stiffness: 8, damping: 5 });

  useEffect(() => {
    if (!containerRef.current) return;
    const content = text.split('');
    let output = content.map(() => ({ type: 'glyph', value: '' }));

    const render = () => {
      if (!containerRef.current) return;
      const html = output
        .map(
          (item) =>
            `<span style="color: ${
              item.type === 'value' ? 'inherit' : 'rgba(0, 229, 255, 0.7)'
            }">${item.value}</span>`
        )
        .join('');
      containerRef.current.innerHTML = html;
    };

    const shuffle = (position: number) => {
      output = content.map((val, i) => {
        if (i < position) return { type: 'value', value: val };
        if (position % 1 < 0.5) {
          const rand = Math.floor(Math.random() * glyphs.length);
          return { type: 'glyph', value: glyphs[rand] };
        }
        return { type: 'glyph', value: output[i]?.value || glyphs[0] };
      });
    };

    const unsubscribe = spring.on('change', (val) => {
      shuffle(val);
      render();
    });

    const timer = setTimeout(() => {
      if (!reduceMotion) {
        spring.set(content.length);
      } else {
        output = content.map((v) => ({ type: 'value', value: v }));
        render();
      }
    }, delay);

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [text, delay, spring, reduceMotion]);

  return <span ref={containerRef} className={className} />;
};
