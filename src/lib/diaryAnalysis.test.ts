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
    expect(analysis.keywordDetails[0]).toMatchObject({
      keyword: "발표",
      description: expect.stringContaining("일기")
    });
    expect(analysis.growthRecords[0]).toMatchObject({
      title: expect.stringContaining("자기")
    });
    expect(analysis.growthNote).toContain("기록");
  });

  it("returns a gentle empty state when there are no diary entries", async () => {
    const analysis = await analyzeDiaryEntries([], localDiaryAnalysisProvider);

    expect(analysis.headline).toBe("아직 분석할 일기가 없어요");
    expect(analysis.summary).toContain("일기를 저장하면");
    expect(analysis.keywords).toEqual([]);
    expect(analysis.emotionPattern.primary.percentage).toBe(0);
  });

  it("does not promote generic one-character words as keywords", async () => {
    const analysis = await analyzeDiaryEntries(
      [
        {
          ...baseEntry,
          content: "오늘 일기를 쓰면서 내 마음을 천천히 바라봤다."
        }
      ],
      localDiaryAnalysisProvider
    );

    expect(analysis.keywords).not.toContain("일");
    expect(analysis.keywordDetails.some((keyword) => keyword.keyword.length < 2)).toBe(false);
  });

  it("detects irritation instead of joy when the diary uses frustrated wording", async () => {
    const analysis = await analyzeDiaryEntries(
      [
        {
          ...baseEntry,
          content: "오늘은 계속 짜증나고 화가 났다. 상황도 좋지 않았고 답답해서 마음이 편하지 않았다."
        }
      ],
      localDiaryAnalysisProvider
    );

    expect(analysis.emotionPattern.primary.label).toBe("짜증");
    expect(analysis.emotionPattern.primary.percentage).toBeGreaterThan(analysis.emotionPattern.secondary.percentage);
    expect(analysis.keywords).toEqual(expect.arrayContaining(["짜증", "답답"]));
  });
});
