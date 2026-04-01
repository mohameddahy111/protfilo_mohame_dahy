"use client";

import { useEffect, useMemo, useState } from "react";

export function TypingRoles({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const currentRole = useMemo(() => roles[index % roles.length], [
    index,
    roles,
  ]);

  useEffect(() => {
    const speed = deleting ? 50 : 100;
    const timeout = setTimeout(() => {
      setText((prev) => {
        if (!deleting && prev === currentRole) {
          setTimeout(() => setDeleting(true), 1000);
          return prev;
        }

        if (deleting && prev.length === 0) {
          setDeleting(false);
          setIndex((value) => (value + 1) % roles.length);
          return "";
        }

        return deleting
          ? currentRole.slice(0, prev.length - 1)
          : currentRole.slice(0, prev.length + 1);
      });
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentRole, deleting, roles.length, text]);

  return (
    <p className="min-h-8 text-lg font-semibold text-brand sm:text-xl">
      {text}
      <span className="animate-pulse">|</span>
    </p>
  );
}
