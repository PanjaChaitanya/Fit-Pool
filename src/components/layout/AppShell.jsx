import { useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { useFitness } from "../../contexts/FitnessContext";
import Icon from "../ui/Icon";
const primary = [
  { label: "Overview", path: "/", icon: "home" },
  { label: "Exercise library", path: "/searchexercises", icon: "activity" },
  { label: "My workout", path: "/workout", icon: "target" },
];
const wellness = [
  { label: "Food explorer", path: "/nutrition", icon: "coffee" },
  { label: "Recipe book", path: "/recipes", icon: "book" },
  { label: "Body metrics", path: "/bmicalculator", icon: "trending" },
  { label: "Outdoors", path: "/outdoors", icon: "sun" },
];
function Mark() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 17V8h9M6 13h7M17 24V8h9v8h-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 25c4-4 8 4 12 0s8 4 12 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
export default function AppShell({
  title,
  subtitle,
  headerActions,
  children,
  home = false,
}) {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { workout, notice, notify } = useFitness();
  const menu = useRef(null);
  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1024) menu.current?.close();
    };
    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, []);
  useEffect(() => {
    menu.current?.close();
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = `${title} · Fitpool`;
  }, [pathname, title]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => notify(""), 3800);
    return () => clearTimeout(timer);
  }, [notice, notify]);
  const navigation = (
    <>
      <Link to="/" className="brand" aria-label="Fitpool overview">
        <span className="brand-mark">
          <Mark />
        </span>
        <span>
          fitpool<span className="brand-dot">.</span>
        </span>
      </Link>
      <div className="workspace-label">Your personal space</div>
      <nav aria-label="Main navigation">
        <p className="nav-group-label">Training</p>
        {primary.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `nav-link ${isActive || (item.path === "/searchexercises" && pathname.startsWith("/exercise/")) ? "active" : ""}`
            }
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
            {item.path === "/workout" && workout.exercises.length > 0 && (
              <span className="nav-count">{workout.exercises.length}</span>
            )}
          </NavLink>
        ))}
        <p className="nav-group-label wellness-label">Everyday wellbeing</p>
        {wellness.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <NavLink className="nav-link" to="/about">
          <Icon name="info" />
          <span>About Fitpool</span>
        </NavLink>
        <button className="nav-link theme-button" onClick={toggleTheme}>
          <Icon name={theme === "dark" ? "sun" : "moon"} />
          <span>
            {theme === "dark" ? "Light appearance" : "Dark appearance"}
          </span>
        </button>
        <div className="local-profile">
          <span className="profile-initial">Y</span>
          <div>
            <strong>Your space</strong>
            <small>Saved on this device</small>
          </div>
          <Icon name="shield" size={16} />
        </div>
      </div>
    </>
  );
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <aside className="sidebar">{navigation}</aside>
      <div className="mobile-bar">
        <Link to="/" className="brand">
          <Mark />
          <span>fitpool.</span>
        </Link>
        <button
          className="icon-button"
          aria-label="Open navigation"
          onClick={() => menu.current.showModal()}
        >
          <Icon name="menu" />
        </button>
      </div>
      <dialog className="navigation-dialog" ref={menu} aria-label="Navigation">
        <button
          className="icon-button mobile-close"
          aria-label="Close navigation"
          onClick={() => menu.current.close()}
          autoFocus
        >
          <Icon name="x" />
        </button>
        {navigation}
      </dialog>
      <main
        id="main-content"
        className={`main-content ${home ? "home-content" : ""}`}
        tabIndex={-1}
      >
        <header className="page-header">
          <div>
            <div className="breadcrumb">
              Your space <span>/</span> {home ? "Overview" : title}
            </div>
            <h1 className={home ? "greeting" : ""}>{title}</h1>
            {subtitle && <p className="page-subtitle">{subtitle}</p>}
          </div>
          <div className="page-actions">{headerActions}</div>
        </header>
        {children}
        <footer className="page-footer">
          <span>A little progress, every day.</span>
          <Link to="/about">
            Made for your own pace <Icon name="arrowUpRight" size={14} />
          </Link>
        </footer>
      </main>
      <div
        className={`notice ${notice ? "visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {notice && (
          <>
            <Icon name="checkCircle" />
            {notice}
          </>
        )}
      </div>
    </div>
  );
}
