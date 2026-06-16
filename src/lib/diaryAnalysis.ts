import type { DiaryAnalysis, DiaryAnalysisProvider, DiaryEntry } from "../types";

const emotionRules = [
  { label: "불안", words: ["불안", "걱정", "긴장", "두려", "부담"], weight: 2 },
  { label: "회복", words: ["회복", "괜찮", "편안", "차분", "쉬", "위로"] },
  { label: "기쁨", words: ["좋", "기쁘", "즐거", "행복", "웃"] },
  { label: "피로", words: ["피곤", "지침", "힘들", "무기력", "지쳤"] },
  { label: "성장", words: ["배웠", "성장", "도전", "준비", "발표", "해냈"] }
];

const keywordRules = [
  "발표",
  "친구",
  "회복",
  "준비",
  "차분",
  "불안",
  "가족",
  "학교",
  "일",
  "휴식",
  "카페",
  "음악",
  "산책",
  "생각",
  "마음"
];

export const emptyDiaryAnalysis: DiaryAnalysis = {
  source: "local",
  headline: "아직 분석할 일기가 없어요",
  summary: "일기를 저장하면 이곳에 감정 패턴과 키워드가 조용히 쌓여요.",
  strength: "기록 시작",
  focus: "오늘의 한 문장",
  growthNote: "첫 기록을 남기면 무드비가 당신의 마음 흐름을 함께 정리해줄게요.",
  keywords: [],
  keywordDetails: [],
  growthRecords: [],
  emotionPattern: {
    primary: { label: "대기", percentage: 0 },
    secondary: { label: "대기", percentage: 0 }
  }
};

export const localDiaryAnalysisProvider: DiaryAnalysisProvider = {
  source: "local",
  async analyze(entries) {
    return analyzeLocally(entries);
  }
};

export async function analyzeDiaryEntries(
  entries: DiaryEntry[],
  provider: DiaryAnalysisProvider = localDiaryAnalysisProvider
) {
  return provider.analyze(entries);
}

function analyzeLocally(entries: DiaryEntry[]): DiaryAnalysis {
  const meaningfulEntries = entries.filter((entry) => entry.content.trim().length > 0);

  if (meaningfulEntries.length === 0) {
    return emptyDiaryAnalysis;
  }

  const text = meaningfulEntries.map((entry) => entry.content).join(" ");
  const emotionScores = emotionRules
    .map((rule) => ({
      label: rule.label,
      score: rule.words.reduce(
        (total, word) => total + countOccurrences(text, word) * (rule.weight ?? 1),
        0
      )
    }))
    .sort((a, b) => b.score - a.score);
  const scoredTotal = emotionScores.reduce((total, emotion) => total + emotion.score, 0);
  const [primaryScore, secondaryScore] = normalizeEmotionScores(emotionScores, scoredTotal);
  const keywords = pickKeywords(text);
  const keywordDetails = createKeywordDetails(text, keywords);
  const strength = createStrength(primaryScore.label);
  const focus = createFocus(primaryScore.label);
  const growthNote = "기록을 이어가며 감정을 말로 정리하는 힘이 조금씩 자라고 있어요.";

  return {
    source: "local",
    headline: createHeadline(primaryScore.label),
    summary: createSummary(primaryScore.label, keywords, meaningfulEntries.length),
    strength,
    focus,
    growthNote,
    keywords,
    keywordDetails,
    growthRecords: createGrowthRecords(strength, focus, growthNote),
    emotionPattern: {
      primary: primaryScore,
      secondary: secondaryScore
    }
  };
}

function normalizeEmotionScores(
  scores: Array<{ label: string; score: number }>,
  total: number
) {
  if (total === 0) {
    return [
      { label: "차분", percentage: 100 },
      { label: "중립", percentage: 0 }
    ];
  }

  const primary = scores[0];
  const secondary = scores[1] ?? { label: "중립", score: 0 };

  return [
    { label: primary.label, percentage: Math.round((primary.score / total) * 100) },
    { label: secondary.label, percentage: Math.round((secondary.score / total) * 100) }
  ];
}

function pickKeywords(text: string) {
  const picked = keywordRules.filter((keyword) => keyword.length >= 2 && text.includes(keyword));
  return [...new Set(picked)].slice(0, 3);
}

function createKeywordDetails(text: string, keywords: string[]) {
  return keywords.map((keyword) => ({
    keyword,
    count: Math.max(countOccurrences(text, keyword), 1),
    description: `${keyword} 키워드는 최근 일기에서 마음의 장면을 설명하는 단서로 나타났어요.`
  }));
}

function createGrowthRecords(strength: string, focus: string, growthNote: string) {
  return [
    {
      title: `${strength} 루틴`,
      body: growthNote,
      tone: "private" as const
    },
    {
      title: `${focus} 연습`,
      body: "반복되는 감정을 바로 해결하려 하기보다 이름 붙이고 바라보는 단계가 생겼어요.",
      tone: "private" as const
    },
    {
      title: "공유 가능한 한 줄",
      body: "나는 내 마음을 기록하면서 나를 더 부드럽게 이해하는 사람입니다.",
      tone: "shareable" as const
    }
  ];
}

function createHeadline(primaryEmotion: string) {
  if (primaryEmotion === "불안") {
    return "불안을 알아차리고 마음을 돌보고 있어요.";
  }

  if (primaryEmotion === "회복") {
    return "회복의 리듬을 다시 찾고 있어요.";
  }

  if (primaryEmotion === "성장") {
    return "새로운 도전을 나만의 속도로 준비하고 있어요.";
  }

  return "오늘의 마음을 차분히 바라보고 있어요.";
}

function createSummary(primaryEmotion: string, keywords: string[], entryCount: number) {
  const keywordText = keywords.length > 0 ? keywords.join(", ") : "마음의 흐름";
  return `${entryCount}개의 비공개 일기에서 ${primaryEmotion} 흐름과 ${keywordText} 키워드가 나타났어요.`;
}

function createStrength(primaryEmotion: string) {
  if (primaryEmotion === "불안") {
    return "자기 관찰";
  }

  if (primaryEmotion === "회복") {
    return "회복 감각";
  }

  return "꾸준한 기록";
}

function createFocus(primaryEmotion: string) {
  if (primaryEmotion === "불안") {
    return "긴장 완화";
  }

  if (primaryEmotion === "피로") {
    return "휴식 신호";
  }

  return "감정 정리";
}

function countOccurrences(text: string, word: string) {
  return text.split(word).length - 1;
}
