import { useState } from "react";
import shopHero from "../assets/shop-hero-moodby.jpg";
import shopItemSheet from "../assets/shop-item-sheet.jpg";

type ShopTab = "recommend" | "items" | "theme" | "decorate" | "package";

type ShopItem = {
  category: ShopTab;
  description: string;
  name: string;
  price: number;
  sheetPosition: string;
  tag: string;
};

const shopTabs: Array<{ id: ShopTab; label: string }> = [
  { id: "recommend", label: "추천" },
  { id: "items", label: "아이템" },
  { id: "theme", label: "테마" },
  { id: "decorate", label: "꾸미기" },
  { id: "package", label: "패키지" }
];

const shopItems: ShopItem[] = [
  {
    category: "items",
    description: "무드비에게 포근한 새싹 포인트를 더해요.",
    name: "새싹 베레모",
    price: 80,
    sheetPosition: "0% 0%",
    tag: "착용"
  },
  {
    category: "decorate",
    description: "일기 쓰는 공간에 말랑한 휴식감을 더해요.",
    name: "구름 쿠션",
    price: 80,
    sheetPosition: "50% 0%",
    tag: "배경"
  },
  {
    category: "theme",
    description: "밤 일기 화면을 따뜻하게 밝혀주는 조명.",
    name: "따뜻한 스탠드",
    price: 120,
    sheetPosition: "100% 0%",
    tag: "테마"
  },
  {
    category: "items",
    description: "무드비의 차분한 루틴을 보여주는 머그컵.",
    name: "하트 머그",
    price: 90,
    sheetPosition: "0% 100%",
    tag: "소품"
  },
  {
    category: "decorate",
    description: "주간 업데이트 화면을 피크닉처럼 꾸며요.",
    name: "피크닉 담요",
    price: 110,
    sheetPosition: "50% 100%",
    tag: "배경"
  },
  {
    category: "package",
    description: "기록 보상과 공개 프로필에 어울리는 배지.",
    name: "기록 배지",
    price: 150,
    sheetPosition: "100% 100%",
    tag: "한정"
  }
];

export function ExpansionScreen() {
  const [activeTab, setActiveTab] = useState<ShopTab>("recommend");
  const [selectedItem, setSelectedItem] = useState<ShopItem>(shopItems[1]);
  const [shopMessage, setShopMessage] = useState("미리보기 중");
  const visibleItems =
    activeTab === "recommend"
      ? shopItems.slice(0, 4)
      : shopItems.filter((item) => item.category === activeTab);

  function handlePreview(item: ShopItem) {
    setSelectedItem(item);
    setShopMessage("미리보기 중");
  }

  return (
    <section className="app-screen shop-screen">
      <header className="app-header shop-header">
        <div>
          <small>발표용 UI</small>
          <h1>Moodby Cozy Shop</h1>
        </div>
        <span className="coin-pill">◎ 320</span>
      </header>

      <div className="shop-tabs" aria-label="상점 카테고리">
        {shopTabs.map((tab) => (
          <button
            className={activeTab === tab.id ? "active" : ""}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      <article className="shop-hero-card">
        <img alt="" src={shopHero} />
        <div className="shop-hero-copy">
          <span>Weekly Reward</span>
          <strong>기록할수록 열리는 무드비 상점</strong>
          <small>결제와 광고는 실제 기능 없이 발표용 UI로만 동작합니다.</small>
        </div>
      </article>

      <article className="shop-preview-card">
        <div
          aria-hidden="true"
          className="shop-preview-item"
          style={{ backgroundImage: `url(${shopItemSheet})`, backgroundPosition: selectedItem.sheetPosition }}
        />
        <div>
          <span>{shopMessage}</span>
          <strong>{selectedItem.name}</strong>
          <small>{selectedItem.description}</small>
        </div>
        <button type="button" onClick={() => setShopMessage("착용 완료 UI")}>착용하기</button>
      </article>

      <section className="shop-section">
        <div className="shop-section-header">
          <h2>{activeTab === "recommend" ? "추천 아이템" : shopTabs.find((tab) => tab.id === activeTab)?.label}</h2>
          <span>UI only</span>
        </div>
        <div className="shop-grid shop-grid--premium">
          {visibleItems.map((item) => (
            <button
              aria-label={`${item.name} 미리보기`}
              className={selectedItem.name === item.name ? "shop-item-card shop-item-card--active" : "shop-item-card"}
              key={item.name}
              onClick={() => handlePreview(item)}
              type="button"
            >
              <span className="shop-item-tag">{item.tag}</span>
              <i
                aria-hidden="true"
                style={{ backgroundImage: `url(${shopItemSheet})`, backgroundPosition: item.sheetPosition }}
              />
              <strong>{item.name}</strong>
              <small>{item.description}</small>
              <b>◎ {item.price}</b>
            </button>
          ))}
        </div>
      </section>

      <div className="payment-grid shop-action-grid">
        <button
          aria-label="광고 보고 30 받기"
          type="button"
          onClick={() => setShopMessage("광고 보상은 발표용 UI입니다")}
        >
          광고 보고 30 받기
          <b>광고 보상은 발표용 UI입니다</b>
        </button>
        <button
          aria-label="프리미엄 구독"
          type="button"
          onClick={() => setShopMessage("프리미엄 구독은 발표용 UI입니다")}
        >
          프리미엄 구독
          <b>구독하기</b>
        </button>
      </div>
    </section>
  );
}
