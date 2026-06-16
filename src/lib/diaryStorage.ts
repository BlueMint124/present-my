import type { DiaryEntry } from "../types";

export const DIARY_STORAGE_KEY = "present-my.diaryEntries";

export function loadDiaryEntries(storage: Storage = window.localStorage): DiaryEntry[] {
  const rawEntries = storage.getItem(DIARY_STORAGE_KEY);

  if (!rawEntries) {
    return [];
  }

  try {
    const parsedEntries = JSON.parse(rawEntries);
    return Array.isArray(parsedEntries) ? parsedEntries.filter(isDiaryEntry) : [];
  } catch {
    return [];
  }
}

export function persistDiaryEntries(
  entries: DiaryEntry[],
  storage: Storage = window.localStorage
) {
  storage.setItem(DIARY_STORAGE_KEY, JSON.stringify(entries));
}

export function appendDiaryEntry(
  entry: DiaryEntry,
  storage: Storage = window.localStorage
) {
  const entries = [...loadDiaryEntries(storage), entry];
  persistDiaryEntries(entries, storage);
  return entries;
}

function isDiaryEntry(entry: unknown): entry is DiaryEntry {
  if (!entry || typeof entry !== "object") {
    return false;
  }

  const candidate = entry as Partial<DiaryEntry>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.createdAt === "string" &&
    typeof candidate.mood === "string" &&
    typeof candidate.prompt === "string" &&
    typeof candidate.content === "string" &&
    Array.isArray(candidate.tags)
  );
}
