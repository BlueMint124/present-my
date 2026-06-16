import { useState } from "react";
import { AppShell } from "./components/AppShell";
import { CharacterScreen } from "./screens/CharacterScreen";
import { DiaryScreen } from "./screens/DiaryScreen";
import { ExpansionScreen } from "./screens/ExpansionScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { InsightsScreen } from "./screens/InsightsScreen";
import { PublicProfileScreen } from "./screens/PublicProfileScreen";
import { appendDiaryEntry, loadDiaryEntries } from "./lib/diaryStorage";
import type { DiaryEntry, ScreenId } from "./types";

export default function App() {
  return (
    <AppContent />
  );
}

function AppContent() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>("home");
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>(() => loadDiaryEntries());

  function handleSaveDiary(entry: DiaryEntry) {
    setDiaryEntries(appendDiaryEntry(entry));
  }

  return (
    <AppShell activeScreen={activeScreen} onNavigate={setActiveScreen}>
      {activeScreen === "home" && <HomeScreen diaryEntries={diaryEntries} />}
      {activeScreen === "diary" && <DiaryScreen onSaveDiary={handleSaveDiary} />}
      {activeScreen === "insights" && <InsightsScreen />}
      {activeScreen === "character" && <CharacterScreen />}
      {activeScreen === "profile" && <PublicProfileScreen />}
      {activeScreen === "expansion" && <ExpansionScreen />}
    </AppShell>
  );
}
