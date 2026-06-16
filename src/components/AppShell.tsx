import type { ReactNode } from "react";
import bottomNavIcons from "../assets/bottom-nav-icons.jpg";
import type { ScreenId } from "../types";

const navItems: Array<{ id: ScreenId; label: string; iconPosition: string }> = [
  { id: "home", label: "홈", iconPosition: "0% 50%" },
  { id: "diary", label: "일기", iconPosition: "20% 50%" },
  { id: "insights", label: "분석", iconPosition: "40% 50%" },
  { id: "character", label: "캐릭터", iconPosition: "60% 50%" },
  { id: "profile", label: "프로필", iconPosition: "80% 50%" },
  { id: "expansion", label: "상점", iconPosition: "100% 50%" }
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
              <span
                aria-hidden="true"
                className="bottom-nav__icon-asset"
                style={{ backgroundImage: `url(${bottomNavIcons})`, backgroundPosition: item.iconPosition }}
              />
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
