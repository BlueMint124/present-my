import type { ReactNode } from "react";
import type { ScreenId } from "../types";

const navItems: Array<{ id: ScreenId; label: string }> = [
  { id: "home", label: "홈" },
  { id: "diary", label: "일기" },
  { id: "insights", label: "분석" },
  { id: "character", label: "캐릭터" },
  { id: "profile", label: "공개 프로필" },
  { id: "expansion", label: "확장 UI" }
];

type AppShellProps = {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  children: ReactNode;
};

export function AppShell({ activeScreen, onNavigate, children }: AppShellProps) {
  const isHome = activeScreen === "home";

  return (
    <div className={isHome ? "app-shell app-shell--board" : "app-shell"}>
      {!isHome && <aside className="sidebar">
        <div>
          <p className="eyebrow">Presentation MVP</p>
          <h1>Present My</h1>
          <p className="sidebar-copy">비공개 일기에서 공개 가능한 캐릭터 프로필로 이어지는 감성 웹앱</p>
        </div>
        <nav aria-label="주요 화면">
          {navItems.map((item) => (
            <button
              className={item.id === activeScreen ? "nav-button nav-button--active" : "nav-button"}
              key={item.id}
              onClick={() => onNavigate(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>}
      <main className="main-panel">{children}</main>
    </div>
  );
}
