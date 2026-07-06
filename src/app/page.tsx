"use client";

import toggleTheme from "@/lib/theme/toggleTheme";

export default function Home() {
  return (
    <>
      <h1>Test</h1>
      <button onClick={() => toggleTheme()}>ici</button>
    </>
  );
}
