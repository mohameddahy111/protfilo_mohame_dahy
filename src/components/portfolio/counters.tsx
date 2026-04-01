"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

type CounterProps = {
  to: number;
  label: string;
};

function CounterItem({ to, label }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const value = useMotionValue(0);
  const spring = useSpring(value, { stiffness: 70, damping: 25 });
  const rounded = useTransform(spring, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      value.set(to);
    }
  }, [inView, to, value]);

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-border bg-card p-4 text-center"
    >
      <motion.p className="text-3xl font-black text-brand">{rounded}</motion.p>
      <p className="mt-1 text-xs text-muted sm:text-sm">{label}</p>
    </div>
  );
}

export function Counters({ items }: { items: CounterProps[] }) {
  return (
    <div className="grid w-full grid-cols-3 gap-3 sm:max-w-lg">
      {items.map((item) => (
        <CounterItem key={item.label} {...item} />
      ))}
    </div>
  );
}
