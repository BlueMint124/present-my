import { useState } from "react";
import { AppShell } from "./components/AppShell";
import { CharacterScreen } from "./screens/CharacterScreen";
import { DiaryScreen } from "./screens/DiaryScreen";
import { ExpansionScreen } from "./screens/ExpansionScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { InsightsScreen } from "./screens/InsightsScreen";
import { PublicProfileScreen } from "./screens/PublicProfileScreen";
import type { ScreenId } from "./types";

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
      {activeScreen === "profile" && <PublicProfileScreen />}
      {activeScreen === "expansion" && <ExpansionScreen />}
    </AppShell>
  );
}
