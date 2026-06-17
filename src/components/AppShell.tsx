import type { ReactNode } from "react";
import type { ScreenId } from "../types";

type NavIconName = "home" | "diary" | "insights" | "character" | "profile" | "shop";

const navItems: Array<{ id: ScreenId; label: string; icon: NavIconName }> = [
  { id: "home", label: "홈", icon: "home" },
  { id: "diary", label: "일기", icon: "diary" },
  { id: "insights", label: "분석", icon: "insights" },
  { id: "character", label: "캐릭터", icon: "character" },
  { id: "profile", label: "프로필", icon: "profile" },
  { id: "expansion", label: "상점", icon: "shop" }
];

type AppShellProps = {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  children: ReactNode;
};

export function AppShell({ activeScreen, onNavigate, children }: AppShellProps) {
  return (
    <div className="app-stage">
      <div className="mobile-app" aria-label="Moodbe mobile web app">
        <main className="app-content">{children}</main>
        <nav className="bottom-nav" aria-label="주요 화면">
          {navItems.map((item) => (
            <button
              aria-current={item.id === activeScreen ? "page" : undefined}
              className={item.id === activeScreen ? "bottom-nav__item bottom-nav__item--active" : "bottom-nav__item"}
              key={item.id}
              onClick={() => onNavigate(item.id)}
              type="button"
            >
              <NavIcon name={item.icon} />
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

function NavIcon({ name }: { name: NavIconName }) {
  const commonProps = {
    "aria-hidden": true,
    className: "bottom-nav__icon-asset",
    fill: "none",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  };

  if (name === "home") {
    return (
      <svg {...commonProps}>
        <path d="M4.5 11.2 12 5l7.5 6.2" />
        <path d="M7 10.8v7.4h10v-7.4" />
        <path d="M10 18v-4h4v4" />
      </svg>
    );
  }

  if (name === "diary") {
    return (
      <svg {...commonProps}>
        <path d="M7 4.8h8.5A2.5 2.5 0 0 1 18 7.3v11.9H8A2.5 2.5 0 0 1 5.5 16.7V6.3A1.5 1.5 0 0 1 7 4.8Z" />
        <path d="M8.5 8.2h6" />
        <path d="M8.5 11h5" />
        <path d="M8 19.2V5.4" />
      </svg>
    );
  }

  if (name === "insights") {
    return (
      <svg {...commonProps}>
        <path d="M6.5 18v-5.5" />
        <path d="M12 18V8" />
        <path d="M17.5 18v-8" />
        <path d="M5 18.5h14" />
        <path d="M6.5 9.5 12 6l5.5 2" />
      </svg>
    );
  }

  if (name === "character") {
    return (
      <svg {...commonProps}>
        <path d="M12 6.4c4.1 0 7 2.8 7 6.6 0 3.6-2.7 6-7 6s-7-2.4-7-6c0-3.8 2.9-6.6 7-6.6Z" />
        <path d="M10.2 5.2c.6-1.2 1.9-1.7 3-1.2" />
        <path d="M9.5 12.2h.1" />
        <path d="M14.4 12.2h.1" />
        <path d="M10.2 15.2c1 .8 2.6.8 3.6 0" />
      </svg>
    );
  }

  if (name === "profile") {
    return (
      <svg {...commonProps}>
        <path d="M8 5.5h8A2.5 2.5 0 0 1 18.5 8v8A2.5 2.5 0 0 1 16 18.5H8A2.5 2.5 0 0 1 5.5 16V8A2.5 2.5 0 0 1 8 5.5Z" />
        <path d="M9 15.8c.7-1.5 1.7-2.2 3-2.2s2.3.7 3 2.2" />
        <path d="M12 11.6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M7 9.5h10l-.8 9H7.8l-.8-9Z" />
      <path d="M9 9.4A3 3 0 0 1 12 6a3 3 0 0 1 3 3.4" />
      <path d="M9.4 13h5.2" />
    </svg>
  );
}
