import { DEFAULT_PLAYER_PROGRESS, type PlayerProgress } from "./playerProgress";

export const PLAYER_PROGRESS_STORAGE_KEY = "moodbe.playerProgress";

export function loadPlayerProgress(storage: Storage = window.localStorage): PlayerProgress {
  const rawProgress = storage.getItem(PLAYER_PROGRESS_STORAGE_KEY);

  if (!rawProgress) {
    return DEFAULT_PLAYER_PROGRESS;
  }

  try {
    const parsedProgress = JSON.parse(rawProgress);
    return isPlayerProgress(parsedProgress) ? parsedProgress : DEFAULT_PLAYER_PROGRESS;
  } catch {
    return DEFAULT_PLAYER_PROGRESS;
  }
}

export function persistPlayerProgress(
  progress: PlayerProgress,
  storage: Storage = window.localStorage
) {
  storage.setItem(PLAYER_PROGRESS_STORAGE_KEY, JSON.stringify(progress));
}

function isPlayerProgress(progress: unknown): progress is PlayerProgress {
  if (!progress || typeof progress !== "object") {
    return false;
  }

  const candidate = progress as Partial<PlayerProgress>;
  return (
    typeof candidate.coinBalance === "number" &&
    (typeof candidate.equippedShopItemId === "string" || candidate.equippedShopItemId === null) &&
    typeof candidate.experience === "number" &&
    typeof candidate.level === "number" &&
    Array.isArray(candidate.ownedShopItemIds) &&
    typeof candidate.totalDiaryEntries === "number"
  );
}
