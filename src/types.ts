export type ScreenId = "home" | "diary" | "insights" | "character" | "profile" | "expansion";

export type DiaryPrompt = {
  id: string;
  label: string;
  answer: string;
};

export type DiaryEntry = {
  id: string;
  createdAt: string;
  mood: string;
  prompt: string;
  content: string;
  tags: string[];
};

export type DiaryAnalysisSource = "local" | "gpt";

export type DiaryEmotionScore = {
  label: string;
  percentage: number;
};

export type DiaryKeywordInsight = {
  keyword: string;
  count: number;
  description: string;
};

export type DiaryGrowthRecord = {
  title: string;
  body: string;
  tone: "private" | "shareable";
};

export type DiaryAnalysis = {
  source: DiaryAnalysisSource;
  headline: string;
  summary: string;
  strength: string;
  focus: string;
  growthNote: string;
  keywords: string[];
  keywordDetails: DiaryKeywordInsight[];
  growthRecords: DiaryGrowthRecord[];
  emotionPattern: {
    primary: DiaryEmotionScore;
    secondary: DiaryEmotionScore;
  };
};

export type DiaryAnalysisProvider = {
  source: DiaryAnalysisSource;
  analyze(entries: DiaryEntry[]): Promise<DiaryAnalysis>;
};

export type InsightMetric = {
  label: string;
  value: string;
  description: string;
};

export type CharacterState = {
  name: string;
  level: string;
  weeklyTheme: string;
  expression: string;
  unlockedItems: string[];
  nextUpdate: string;
};

export type PublicProfileItem = {
  id: string;
  title: string;
  body: string;
  approved: boolean;
};

export type ExpansionCard = {
  title: string;
  status: "UI only" | "Demo ready";
  description: string;
};
