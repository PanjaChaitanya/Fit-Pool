import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ThemeToggle from "../system/ThemeToggle";

const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "BMI", path: "/bmicalculator" },
  { label: "Exercises", path: "/searchexercises" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const isRouteActive = (pathname, path) => {
  if (path === "/") {
    return pathname === "/";
  }
  if (path === "/searchexercises") {
    return pathname.startsWith("/searchexercises") || pathname.startsWith("/exercise/");
  }
  return pathname === path;
};

const AppShell = ({ title, subtitle, headerActions, children }) => {
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const currentPage = useMemo(() => {
    const match = NAV_ITEMS.find((item) => isRouteActive(pathname, item.path));
    return match?.label ?? "Fit Pool";
  }, [pathname]);

  return (
    <div className="app-shell">
      <button
        type="button"
        className="mobile-nav-trigger"
        onClick={() => setMobileMenuOpen(true)}
        aria-label="Open navigation"
      >
        Menu
      </button>

      {mobileMenuOpen && (
        <button
          type="button"
          className="mobile-nav-overlay"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close navigation menu overlay"
        />
      )}

      <aside className={`app-sidebar ${mobileMenuOpen ? "open" : ""}`.trim()}>
        <div className="brand-block">
          <img src="/images/fitpool.png" alt="Fit Pool logo" />
          <div>
            <p className="brand-name">Fit Pool</p>
            <p className="brand-sub">Performance OS</p>
          </div>
        </div>

        <nav className="app-nav">
          {NAV_ITEMS.map((item) => {
            const active = isRouteActive(pathname, item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`app-nav-link ${active ? "is-active" : ""}`.trim()}
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <ThemeToggle />
        </div>
      </aside>

      <div className="app-main">
        <header className="app-header">
          <div>
            <p className="header-eyebrow">{subtitle ?? "Fitness workspace"}</p>
            <h1>{title ?? currentPage}</h1>
          </div>
          <div className="header-actions">
            {headerActions}
            <ThemeToggle compact />
          </div>
        </header>

        <main className="app-content">{children}</main>
      </div>
    </div>
  );
};

export default AppShell;
