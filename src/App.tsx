import { useEffect, useState } from "react";
import { AppShell } from "./components/AppShell";
import { CharacterScreen } from "./screens/CharacterScreen";
import { DiaryScreen } from "./screens/DiaryScreen";
import { ExpansionScreen } from "./screens/ExpansionScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { InsightsScreen } from "./screens/InsightsScreen";
import { PublicProfileScreen } from "./screens/PublicProfileScreen";
import { analyzeDiaryEntries, emptyDiaryAnalysis } from "./lib/diaryAnalysis";
import { appendDiaryEntry, loadDiaryEntries } from "./lib/diaryStorage";
import { equipShopItem, grantDiaryExperience, purchaseShopItem, type PurchaseResult } from "./lib/playerProgress";
import { loadPlayerProgress, persistPlayerProgress } from "./lib/playerProgressStorage";
import { findEquippedShopItems, findShopItem, type ShopItem } from "./data/shopItems";
import type { DiaryAnalysis, DiaryEntry, ScreenId } from "./types";

export default function App() {
  return (
    <AppContent />
  );
}

function AppContent() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>("home");
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>(() => loadDiaryEntries());
  const [diaryAnalysis, setDiaryAnalysis] = useState<DiaryAnalysis>(emptyDiaryAnalysis);
  const [playerProgress, setPlayerProgress] = useState(() => loadPlayerProgress());

  useEffect(() => {
    const appContent = document.querySelector(".app-content");
    if (appContent) {
      appContent.scrollTop = 0;
    }
  }, [activeScreen]);

  useEffect(() => {
    let isCurrent = true;

    analyzeDiaryEntries(diaryEntries).then((analysis) => {
      if (isCurrent) {
        setDiaryAnalysis(analysis);
      }
    });

    return () => {
      isCurrent = false;
    };
  }, [diaryEntries]);

  useEffect(() => {
    persistPlayerProgress(playerProgress);
  }, [playerProgress]);

  function handleSaveDiary(entry: DiaryEntry) {
    setDiaryEntries(appendDiaryEntry(entry));
    setPlayerProgress((progress) => grantDiaryExperience(progress, entry));
  }

  function handlePurchaseShopItem(item: ShopItem): PurchaseResult {
    let result: PurchaseResult = "success";

    setPlayerProgress((progress) => {
      const purchase = purchaseShopItem(progress, item);
      result = purchase.result;
      return purchase.progress;
    });

    return result;
  }

  function handleEquipShopItem(itemId: string) {
    const item = findShopItem(itemId);

    if (!item) {
      return;
    }

    setPlayerProgress((progress) => equipShopItem(progress, item));
  }

  const equippedShopItems = findEquippedShopItems(playerProgress.equippedShopItemIds);

  return (
    <AppShell activeScreen={activeScreen} onNavigate={setActiveScreen}>
      {activeScreen === "home" && (
        <HomeScreen diaryEntries={diaryEntries} equippedShopItems={equippedShopItems} onNavigate={setActiveScreen} />
      )}
      {activeScreen === "diary" && <DiaryScreen diaryEntries={diaryEntries} onSaveDiary={handleSaveDiary} />}
      {activeScreen === "insights" && <InsightsScreen analysis={diaryAnalysis} />}
      {activeScreen === "character" && (
        <CharacterScreen equippedShopItems={equippedShopItems} playerProgress={playerProgress} />
      )}
      {activeScreen === "profile" && <PublicProfileScreen />}
      {activeScreen === "expansion" && (
        <ExpansionScreen
          onEquipShopItem={handleEquipShopItem}
          onPurchaseShopItem={handlePurchaseShopItem}
          playerProgress={playerProgress}
        />
      )}
    </AppShell>
  );
}
