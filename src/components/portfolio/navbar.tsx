"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { LanguageSwitcher } from "@/components/portfolio/language-switcher";
import { ThemeToggle } from "@/components/portfolio/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavMap = {
  home: string;
  about: string;
  skills: string;
  experience: string;
  projects: string;
  education: string;
  contact: string;
};

export function Navbar({ labels }: { labels: NavMap }) {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  const items = useMemo(
    () => [
      { id: "home", label: labels.home },
      { id: "about", label: labels.about },
      { id: "skills", label: labels.skills },
      { id: "experience", label: labels.experience },
      { id: "projects", label: labels.projects },
      { id: "education", label: labels.education },
      { id: "contact", label: labels.contact },
    ],
    [labels],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-20% 0px -65% 0px",
      },
    );

    items.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="section-shell flex h-16 items-center justify-between">
        <a
          href="#home"
          className="text-sm font-black tracking-[0.2em] text-brand sm:text-base"
        >
          MOHAMED DAHY
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active === item.id
                  ? "bg-brand text-white"
                  : "text-muted hover:text-foreground",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button
            size="icon"
            variant="secondary"
            className="lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border/60 px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium",
                  active === item.id ? "bg-brand text-white" : "text-muted",
                )}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
