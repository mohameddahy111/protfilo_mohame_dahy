"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "portfolio-color-scheme";

type Palette = {
  id: string;
  label: string;
  color: string;
};

const palettes: Palette[] = [
  { id: "sky", label: "Sky", color: "#0ea5e9" },
  { id: "emerald", label: "Emerald", color: "#10b981" },
  { id: "sunset", label: "Sunset", color: "#f97316" },
  { id: "ruby", label: "Ruby", color: "#ef4444" },
];

export function ColorSwitcher() {
  const [active, setActive] = useState("sky");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const initial = palettes.some((p) => p.id === stored) ? stored : "sky";
    document.documentElement.setAttribute(
      "data-color-scheme",
      initial ?? "sky",
    );
    setActive(initial ?? "sky");
  }, []);

  const applyScheme = (schemeId: string) => {
    document.documentElement.setAttribute("data-color-scheme", schemeId);
    localStorage.setItem(STORAGE_KEY, schemeId);
    setActive(schemeId);
  };

  return (
    <div
      className="hidden items-center gap-1 md:flex"
      aria-label="Color palette switcher"
    >
      {palettes.map((palette) => (
        <button
          key={palette.id}
          type="button"
          onClick={() => applyScheme(palette.id)}
          title={palette.label}
          aria-label={`Use ${palette.label} palette`}
          className={cn(
            "h-5 w-5 rounded-full border-2 border-white/70 transition-transform hover:scale-110",
            active === palette.id
              ? "ring-2 ring-ring ring-offset-1"
              : "opacity-80",
          )}
          style={{ backgroundColor: palette.color }}
        />
      ))}
    </div>
  );
}
