import { useEffect, useState } from "react";
import { AppShell } from "./components/AppShell";
import { AuthStatusBar } from "./components/AuthStatusBar";
import { CharacterScreen } from "./screens/CharacterScreen";
import { DiaryScreen } from "./screens/DiaryScreen";
import { ExpansionScreen } from "./screens/ExpansionScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { InsightsScreen } from "./screens/InsightsScreen";
import { ProfileOnboardingScreen } from "./screens/ProfileOnboardingScreen";
import { PublicProfileScreen } from "./screens/PublicProfileScreen";
import { analyzeDiaryEntries, emptyDiaryAnalysis } from "./lib/diaryAnalysis";
import { appendDiaryEntry, loadDiaryEntries } from "./lib/diaryStorage";
import { equipShopItem, grantDiaryExperience, purchaseShopItem, type PurchaseResult } from "./lib/playerProgress";
import { loadPlayerProgress, persistPlayerProgress } from "./lib/playerProgressStorage";
import {
  equipOwnedShopItem,
  fetchDiaryEntries,
  fetchPlayerProgress,
  insertDiaryEntry,
  updatePlayerProgress,
  upsertOwnedShopItem
} from "./lib/supabaseRepository";
import { findEquippedShopItems, findShopItem, type ShopItem } from "./data/shopItems";
import { useMoodbeProfile } from "./hooks/useMoodbeProfile";
import { useSupabaseAuth } from "./hooks/useSupabaseAuth";
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
  const auth = useSupabaseAuth();
  const moodbeProfile = useMoodbeProfile(auth.user);
  const activeProfileId = moodbeProfile.profile?.onboardingCompleted ? moodbeProfile.profile.id : null;

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
    if (!activeProfileId) {
      persistPlayerProgress(playerProgress);
    }
  }, [activeProfileId, playerProgress]);

  useEffect(() => {
    if (!activeProfileId) {
      return;
    }

    let isCurrent = true;

    Promise.all([fetchDiaryEntries(activeProfileId), fetchPlayerProgress(activeProfileId)])
      .then(([remoteDiaryEntries, remotePlayerProgress]) => {
        if (!isCurrent) {
          return;
        }

        setDiaryEntries(remoteDiaryEntries);

        if (remotePlayerProgress) {
          setPlayerProgress(remotePlayerProgress);
        }
      })
      .catch((remoteError: Error) => {
        console.error(remoteError);
      });

    return () => {
      isCurrent = false;
    };
  }, [activeProfileId]);

  function handleSaveDiary(entry: DiaryEntry) {
    if (activeProfileId) {
      setDiaryEntries((entries) => [...entries, entry]);
      void insertDiaryEntry(entry, activeProfileId).catch((remoteError: Error) => {
        console.error(remoteError);
      });

      setPlayerProgress((progress) => {
        const nextProgress = grantDiaryExperience(progress, entry);
        void updatePlayerProgress(activeProfileId, nextProgress).catch((remoteError: Error) => {
          console.error(remoteError);
        });
        return nextProgress;
      });
      return;
    }

    setDiaryEntries(appendDiaryEntry(entry));
    setPlayerProgress((progress) => grantDiaryExperience(progress, entry));
  }

  function handlePurchaseShopItem(item: ShopItem): PurchaseResult {
    let result: PurchaseResult = "success";

    setPlayerProgress((progress) => {
      const purchase = purchaseShopItem(progress, item);
      result = purchase.result;

      if (activeProfileId && purchase.result === "success") {
        void upsertOwnedShopItem(activeProfileId, item.id).catch((remoteError: Error) => {
          console.error(remoteError);
        });
        void updatePlayerProgress(activeProfileId, purchase.progress).catch((remoteError: Error) => {
          console.error(remoteError);
        });
      }

      return purchase.progress;
    });

    return result;
  }

  function handleEquipShopItem(itemId: string) {
    const item = findShopItem(itemId);

    if (!item) {
      return;
    }

    setPlayerProgress((progress) => {
      const nextProgress = equipShopItem(progress, item);

      if (activeProfileId && nextProgress !== progress) {
        void equipOwnedShopItem(activeProfileId, item).catch((remoteError: Error) => {
          console.error(remoteError);
        });
      }

      return nextProgress;
    });
  }

  const equippedShopItems = findEquippedShopItems(playerProgress.equippedShopItemIds);

  return (
    <AppShell activeScreen={activeScreen} onNavigate={setActiveScreen}>
      <AuthStatusBar
        authEnabled={auth.authEnabled}
        error={auth.error}
        isLoading={auth.isLoading}
        onSignIn={auth.signIn}
        onSignOut={auth.signOut}
        user={auth.user}
      />
      {auth.user && moodbeProfile.profile && !moodbeProfile.profile.onboardingCompleted ? (
        <ProfileOnboardingScreen
          error={moodbeProfile.error}
          isSaving={moodbeProfile.isSaving}
          onComplete={moodbeProfile.completeOnboarding}
          profile={moodbeProfile.profile}
        />
      ) : (
        <>
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
        </>
      )}
    </AppShell>
  );
}
