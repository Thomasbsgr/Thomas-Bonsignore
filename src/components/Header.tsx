"use client";
import { getTheme, toggleTheme } from "@/lib/theme/toggleTheme";
import { Circle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useState } from "react";

export default function Header() {
  const t = useTranslations("Header");
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [locale, setLocale] = useState(
    currentLocale === "fr" ? "fr / en" : "en / fr",
  );
  const [theme, setTheme] = useState(getTheme() === "light" ? "dark" : "light");

  function handleToggleLocale() {
    const nextLocale = currentLocale === "fr" ? "en" : "fr";
    router.replace(pathname, { locale: nextLocale });
    setLocale(nextLocale === "fr" ? "en / fr" : "fr / en");
  }

  function handleToggleTheme() {
    toggleTheme();
    setTheme(getTheme() === "light" ? "dark" : "light");
  }

  return (
    <header className="px-12 h-14 flex items-center justify-between border-b border-b-border">
      <div className="flex items-center gap-4">
        <p className="uppercase text-xxs tracking-widest text-muted-foreground">
          {t("left.status")}
        </p>
        <div className="flex items-center gap-1">
          <p>
            <Circle
              className="text-green-600 fill-green-600 animate-pulse"
              size={8}
            />
          </p>
          <p className="uppercase text-xxs font-semibold">
            {t("left.ready_for_engagement")}
          </p>
        </div>
      </div>
      <div className="flex gap-8">
        <div className="flex flex-col items-end">
          <p className="uppercase text-xxxs tracking-widest text-muted-foreground">
            {t("right.current_stack")}
          </p>
          <p className="uppercase text-xxs">{t("right.stack")}</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="uppercase text-xxxs tracking-widest text-muted-foreground">
            {t("right.education")}
          </p>
          <p className="uppercase text-xxs">{t("right.solvay")}</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleToggleTheme}
            className="text-xxs uppercase tracking-widest font-medium py-1 px-2 border border-border flex items-center gap-2 cursor-pointer"
          >
            <Circle className="text-primary fill-primary" size={8} />
            <span>{theme}</span>
          </button>
          <button
            onClick={handleToggleLocale}
            className="text-xxs uppercase tracking-widest font-medium py-1 px-2 border border-border cursor-pointer"
          >
            {locale}
          </button>
        </div>
      </div>
    </header>
  );
}
