"use client";

import toggleTheme from "@/lib/theme/toggleTheme";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <>
      <h1>{t("title")}</h1>
      <button onClick={() => toggleTheme()}>ici</button>
    </>
  );
}
