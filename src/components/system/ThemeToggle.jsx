import { useTheme } from "../../contexts/ThemeContext";

const ThemeToggle = ({ compact = false }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={`theme-toggle ${compact ? "theme-toggle-compact" : ""}`.trim()}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {isDark ? "☀" : "☾"}
      </span>
      {!compact && <span>{isDark ? "Light mode" : "Dark mode"}</span>}
    </button>
  );
};

export default ThemeToggle;
