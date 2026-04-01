"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";

export function LocaleSync() {
  const locale = useLocale() as "en" | "ar";

  useEffect(() => {
    localStorage.setItem("preferred-locale", locale);
    document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000`;
  }, [locale]);

  return null;
}
