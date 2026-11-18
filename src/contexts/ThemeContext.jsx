import { createContext, useContext, useEffect, useMemo, useState } from "react";

const THEME_STORAGE_KEY = "fit-pool-theme";
const ThemeContext = createContext(null);

const getSystemTheme = () => {
  if (typeof window === "undefined" || !window.matchMedia) {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const getInitialTheme = () => {
  if (typeof window === "undefined") {
    return "light";
  }

  let saved;
  try {
    saved = window.localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return "light";
  }
  if (saved === "dark" || saved === "light") {
    return saved;
  }

  return getSystemTheme();
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#141613" : "#fbfcf9");
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* Appearance still works without storage. */
    }
  }, [theme]);

  useEffect(() => {
    let saved;
    try {
      saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
      return undefined;
    }
    if (saved) {
      return undefined;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event) => {
      setTheme(event.matches ? "dark" : "light");
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme: () =>
        setTheme((current) => (current === "dark" ? "light" : "dark")),
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
