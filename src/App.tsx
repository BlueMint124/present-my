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
import { findShopItem, type ShopItem } from "./data/shopItems";
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
  const [coinBalance, setCoinBalance] = useState(320);
  const [ownedShopItemIds, setOwnedShopItemIds] = useState<string[]>([]);
  const [equippedShopItemId, setEquippedShopItemId] = useState<string | null>(null);

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

  function handleSaveDiary(entry: DiaryEntry) {
    setDiaryEntries(appendDiaryEntry(entry));
  }

  function handlePurchaseShopItem(item: ShopItem) {
    if (ownedShopItemIds.includes(item.id)) {
      return true;
    }

    if (coinBalance < item.price) {
      return false;
    }

    setCoinBalance((balance) => balance - item.price);
    setOwnedShopItemIds((items) => [...items, item.id]);
    return true;
  }

  const equippedShopItem = findShopItem(equippedShopItemId);

  return (
    <AppShell activeScreen={activeScreen} onNavigate={setActiveScreen}>
      {activeScreen === "home" && <HomeScreen diaryEntries={diaryEntries} equippedShopItem={equippedShopItem} />}
      {activeScreen === "diary" && <DiaryScreen diaryEntries={diaryEntries} onSaveDiary={handleSaveDiary} />}
      {activeScreen === "insights" && <InsightsScreen analysis={diaryAnalysis} />}
      {activeScreen === "character" && <CharacterScreen equippedShopItem={equippedShopItem} />}
      {activeScreen === "profile" && <PublicProfileScreen />}
      {activeScreen === "expansion" && (
        <ExpansionScreen
          coinBalance={coinBalance}
          equippedShopItemId={equippedShopItemId}
          onEquipShopItem={setEquippedShopItemId}
          onPurchaseShopItem={handlePurchaseShopItem}
          ownedShopItemIds={ownedShopItemIds}
        />
      )}
    </AppShell>
  );
}
