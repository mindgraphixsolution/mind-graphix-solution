'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CounterProps {
  value: number;
  duration?: number;
  suffix?: string;
}

const Counter: React.FC<CounterProps> = ({ value, duration = 2, suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const totalMilSec = duration * 1000;
      const incrementTime = (totalMilSec / end);

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
    return undefined;
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="font-bold">
      {count}{suffix}
    </span>
  );
};

export default Counter;
