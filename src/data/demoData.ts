import type { CharacterState, DiaryPrompt, ExpansionCard, InsightMetric, PublicProfileItem } from "../types";

export const diaryPrompts: DiaryPrompt[] = [
  { id: "mood", label: "오늘의 기분", answer: "차분하지만 조금 설레요." },
  { id: "scene", label: "기억나는 장면", answer: "새로운 카페에서 오래 미뤄둔 생각을 정리했어요." },
  { id: "me", label: "나답다고 느낀 시간", answer: "친구 이야기를 끝까지 듣고 조심스럽게 답했어요." },
  { id: "liked", label: "오늘 좋았던 것", answer: "따뜻한 라떼, 조용한 음악, 창문 옆 자리." },
  { id: "free", label: "자유 일기", answer: "혼자 있는 시간이 나를 외롭게 만들지만, 좋은 대화도 필요하다는 걸 알게 됐어요." }
];

export const insightMetrics: InsightMetric[] = [
  { label: "반복 감정", value: "차분함 42%", description: "최근 기록에서 안정과 정리 욕구가 자주 등장합니다." },
  { label: "대표 취향", value: "카페, 산책, 음악", description: "공간과 분위기에 민감하게 반응하는 편입니다." },
  { label: "성향 패턴", value: "느린 친밀감", description: "빠르게 친해지기보다 깊은 대화를 선호합니다." },
  { label: "이번 주 키워드", value: "정리, 관찰, 회복", description: "혼자 생각을 다듬는 시간이 중요한 주간입니다." }
];

export const characterState: CharacterState = {
  name: "무드비",
  level: "Week 3",
  weeklyTheme: "조용한 카페 탐색가",
  expression: "편안한 미소",
  unlockedItems: ["머그컵", "노트", "창가 자리", "초록 스카프"],
  nextUpdate: "다음 일요일 밤"
};

export const publicProfileItems: PublicProfileItem[] = [
  { id: "summary", title: "나를 설명하는 한 문장", body: "조용한 공간에서 생각을 정리하고, 깊은 대화를 좋아하는 사람.", approved: true },
  { id: "badges", title: "성향 배지", body: "감성 탐색가, 다정한 대화가, 분위기 수집가", approved: true },
  { id: "taste", title: "취향 지도", body: "라떼, 창가 자리, 잔잔한 플레이리스트, 따뜻한 산책", approved: true },
  { id: "match", title: "나와 잘 맞는 사람", body: "천천히 친해지고 서로의 이야기를 오래 들어주는 사람.", approved: true },
  { id: "talk", title: "대화 시작 추천", body: "요즘 가장 자주 가는 공간은 어디야? / 혼자 있을 때 뭐 하면 회복돼?", approved: true },
  { id: "private", title: "일기 원문", body: "원문은 공개 프로필에 포함하지 않습니다.", approved: false }
];

export const expansionCards: ExpansionCard[] = [
  { title: "아이템 상점", status: "UI only", description: "캐릭터 의상, 방 소품, 배경을 둘러보는 화면입니다." },
  { title: "광고 보상", status: "UI only", description: "광고 시청 후 재화를 받는 흐름을 발표용으로 보여줍니다." },
  { title: "결제 안내", status: "UI only", description: "구매와 구독 결제 예정 영역을 발표형 UI로 보여줍니다." },
  { title: "업적 보상", status: "Demo ready", description: "연속 기록과 주간 업데이트 달성 보상을 보여줍니다." }
];
