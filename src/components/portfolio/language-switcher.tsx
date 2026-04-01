"use client";

import { Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

const labels = {
  en: "English",
  ar: "العربية",
};

export function LanguageSwitcher() {
  const locale = useLocale() as "en" | "ar";
  const pathname = usePathname();
  const router = useRouter();

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "ar" : "en";

    localStorage.setItem("preferred-locale", nextLocale);
    document.cookie = `NEXT_LOCALE=${nextLocale};path=/;max-age=31536000`;
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      className="gap-2"
      onClick={toggleLocale}
      aria-label="Switch language"
    >
      <Globe className="h-4 w-4" />
      <span className="hidden sm:inline">{labels[locale]}</span>
      <span className="sm:hidden">{locale.toUpperCase()}</span>
    </Button>
  );
}
