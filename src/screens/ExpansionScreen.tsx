import { useState } from "react";
import currencyIcons from "../assets/currency-icons.jpg";
import shopHero from "../assets/shop-hero-moodby.jpg";
import shopItemSheet from "../assets/shop-item-sheet.jpg";

type ShopTab = "recommend" | "items" | "theme" | "decorate" | "package";

type ShopItem = {
  category: ShopTab;
  description: string;
  id: string;
  name: string;
  price: number;
  purchasable?: boolean;
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
    tag: "한정"
  }
];

export function ExpansionScreen() {
  const [activeTab, setActiveTab] = useState<ShopTab>("recommend");
  const [coinBalance, setCoinBalance] = useState(320);
  const [ownedItems, setOwnedItems] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<ShopItem>(shopItems[1]);
  const [shopMessage, setShopMessage] = useState("미리보기 중");
  const visibleItems =
    activeTab === "recommend"
      ? shopItems.slice(0, 4)
      : shopItems.filter((item) => item.category === activeTab);

  function handlePreview(item: ShopItem) {
    setSelectedItem(item);
    setShopMessage(ownedItems.includes(item.id) ? "보유 중" : "미리보기 중");
  }

  function handlePrimaryAction() {
    const isOwned = ownedItems.includes(selectedItem.id);

    if (selectedItem.purchasable && !isOwned) {
      if (coinBalance < selectedItem.price) {
        setShopMessage("재화가 부족해요");
        return;
      }

      setCoinBalance((balance) => balance - selectedItem.price);
      setOwnedItems((items) => [...items, selectedItem.id]);
      setShopMessage("구매 완료");
      return;
    }

    setShopMessage(isOwned ? "착용 완료" : "미리보기 전용 UI");
  }

  const isSelectedOwned = ownedItems.includes(selectedItem.id);
  const primaryActionLabel =
    selectedItem.purchasable && !isSelectedOwned ? `${selectedItem.name} 구매하기` : "착용하기";

  return (
    <section className="app-screen shop-screen">
      <header className="app-header shop-header">
        <div>
          <small>발표용 UI</small>
          <h1>Moodby Cozy Shop</h1>
        </div>
        <span className="coin-pill">
          <CurrencyIcon />
          <b>{coinBalance}</b>
        </span>
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
        <button aria-label={primaryActionLabel} type="button" onClick={handlePrimaryAction}>
          {primaryActionLabel}
        </button>
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
                className="shop-item-art"
                style={{ backgroundImage: `url(${shopItemSheet})`, backgroundPosition: item.sheetPosition }}
              />
              <strong>{item.name}</strong>
              <small>{item.description}</small>
              <b><CurrencyIcon />{ownedItems.includes(item.id) ? "보유" : item.price}</b>
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

function CurrencyIcon() {
  return (
    <i
      aria-hidden="true"
      className="currency-icon currency-icon--coin"
      style={{ backgroundImage: `url(${currencyIcons})` }}
    />
  );
}
