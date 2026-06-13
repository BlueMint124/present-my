import type { ReactNode } from "react";
import type { ScreenId } from "../types";

const navItems: Array<{ id: ScreenId; label: string; icon: string }> = [
  { id: "home", label: "홈", icon: "⌂" },
  { id: "diary", label: "일기", icon: "□" },
  { id: "insights", label: "분석", icon: "▥" },
  { id: "character", label: "캐릭터", icon: "◌" },
  { id: "profile", label: "프로필", icon: "♙" },
  { id: "expansion", label: "상점", icon: "▣" }
];

type AppShellProps = {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  children: ReactNode;
};

export function AppShell({ activeScreen, onNavigate, children }: AppShellProps) {
  return (
    <div className="app-stage">
      <div className="mobile-app" aria-label="Present My mobile web app">
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
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
