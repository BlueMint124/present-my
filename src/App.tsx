import { useState } from "react";
import { AppShell } from "./components/AppShell";
import { CharacterScreen } from "./screens/CharacterScreen";
import { DiaryScreen } from "./screens/DiaryScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { InsightsScreen } from "./screens/InsightsScreen";
import type { ScreenId } from "./types";

const pendingScreenCopy: Record<"profile" | "expansion", { title: string; body: string }> = {
  profile: {
    title: "승인형 공개 프로필",
    body: "다음 작업에서 승인된 항목만 공유 카드에 담는 화면으로 교체됩니다."
  },
  expansion: {
    title: "발표용 확장 UI",
    body: "다음 작업에서 상점, 광고, 결제, 업적의 UI-only 화면으로 교체됩니다."
  }
};

export default function App() {
  return (
    <AppContent />
  );
}

function AppContent() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>("home");

  return (
    <AppShell activeScreen={activeScreen} onNavigate={setActiveScreen}>
      {activeScreen === "home" && <HomeScreen />}
      {activeScreen === "diary" && <DiaryScreen />}
      {activeScreen === "insights" && <InsightsScreen />}
      {activeScreen === "character" && <CharacterScreen />}
      {activeScreen === "profile" && <PendingScreen screen="profile" />}
      {activeScreen === "expansion" && <PendingScreen screen="expansion" />}
    </AppShell>
  );
}

function PendingScreen({ screen }: { screen: "profile" | "expansion" }) {
  const copy = pendingScreenCopy[screen];

  return (
    <section className="page-hero">
      <p className="eyebrow">Next Screen</p>
      <h2>{copy.title}</h2>
      <p>{copy.body}</p>
    </section>
  );
}
