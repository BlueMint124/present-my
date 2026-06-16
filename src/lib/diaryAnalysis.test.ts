import { describe, expect, it } from "vitest";
import { analyzeDiaryEntries, localDiaryAnalysisProvider } from "./diaryAnalysis";
import type { DiaryEntry } from "../types";

const baseEntry: DiaryEntry = {
  id: "entry-1",
  createdAt: "2026-06-16T07:00:00.000Z",
  mood: "차분",
  prompt: "오늘 가장 마음을 움직였던 순간은 언제였나요?",
  content: "",
  tags: ["private"]
};

describe("diary analysis", () => {
  it("creates a local analysis from private diary entries", async () => {
    const analysis = await analyzeDiaryEntries(
      [
        {
          ...baseEntry,
          content: "발표 준비가 조금 불안했지만 친구와 이야기하면서 마음이 차분해지고 회복되는 느낌이었다."
        }
      ],
      localDiaryAnalysisProvider
    );

    expect(analysis.source).toBe("local");
    expect(analysis.headline).toContain("불안을");
    expect(analysis.emotionPattern.primary.label).toBe("불안");
    expect(analysis.keywords).toEqual(expect.arrayContaining(["발표", "친구", "회복"]));
    expect(analysis.growthNote).toContain("기록");
  });

  it("returns a gentle empty state when there are no diary entries", async () => {
    const analysis = await analyzeDiaryEntries([], localDiaryAnalysisProvider);

    expect(analysis.headline).toBe("아직 분석할 일기가 없어요");
    expect(analysis.summary).toContain("일기를 저장하면");
    expect(analysis.keywords).toEqual([]);
    expect(analysis.emotionPattern.primary.percentage).toBe(0);
  });
});
