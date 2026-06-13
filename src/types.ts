export type ScreenId = "home" | "diary" | "insights" | "character" | "profile" | "expansion";

export type DiaryPrompt = {
  id: string;
  label: string;
  answer: string;
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
