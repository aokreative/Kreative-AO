"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const t = document.documentElement.dataset.theme;
    if (t === "light") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
    try {
      localStorage.setItem("aok-theme", newTheme);
    } catch {
      // ignore
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="label flex items-center gap-2 text-teal-soft transition-colors hover:text-parchment"
      aria-label="Toggle theme"
    >
      <span className={theme === "light" ? "text-parchment" : ""}>LIGHT</span>
      <span className="text-teal-mid">/</span>
      <span className={theme === "dark" ? "text-parchment" : ""}>DARK</span>
    </button>
  );
}
