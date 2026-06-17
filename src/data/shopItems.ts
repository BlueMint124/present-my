export type ShopTab = "recommend" | "items" | "theme" | "decorate" | "package";

export type ShopItem = {
  category: ShopTab;
  description: string;
  id: string;
  name: string;
  price: number;
  purchasable?: boolean;
  sheetPosition: string;
  tag: string;
};

export const shopTabs: Array<{ id: ShopTab; label: string }> = [
  { id: "recommend", label: "추천" },
  { id: "items", label: "아이템" },
  { id: "theme", label: "테마" },
  { id: "decorate", label: "꾸미기" },
  { id: "package", label: "패키지" }
];

export const shopItems: ShopItem[] = [
  {
    category: "items",
    description: "무드비에게 포근한 새싹 포인트를 더해요.",
    id: "sprout-beret",
    name: "새싹 베레모",
    price: 80,
    sheetPosition: "0% 0%",
    tag: "착용"
  },
  {
    category: "decorate",
    description: "일기 쓰는 공간에 말랑한 휴식감을 더해요.",
    id: "cloud-cushion",
    name: "구름 쿠션",
    price: 80,
    purchasable: true,
    sheetPosition: "50% 0%",
    tag: "배경"
  },
  {
    category: "theme",
    description: "밤 일기 화면을 따뜻하게 밝혀주는 조명.",
    id: "warm-lamp",
    name: "따뜻한 스탠드",
    price: 120,
    sheetPosition: "100% 0%",
    tag: "테마"
  },
  {
    category: "items",
    description: "무드비의 차분한 루틴을 보여주는 머그컵.",
    id: "heart-mug",
    name: "하트 머그",
    price: 90,
    sheetPosition: "0% 100%",
    tag: "소품"
  },
  {
    category: "decorate",
    description: "주간 업데이트 화면을 피크닉처럼 꾸며요.",
    id: "picnic-blanket",
    name: "피크닉 담요",
    price: 110,
    sheetPosition: "50% 100%",
    tag: "배경"
  },
  {
    category: "package",
    description: "기록 보상과 공개 프로필에 어울리는 배지.",
    id: "diary-badge",
    name: "기록 배지",
    price: 150,
    sheetPosition: "100% 100%",
    tag: "상징"
  }
];

export function findShopItem(itemId?: string | null) {
  return shopItems.find((item) => item.id === itemId);
}
