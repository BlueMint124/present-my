import { useState } from "react";
import currencyIcons from "../assets/currency-icons.jpg";
import shopHero from "../assets/shop-hero-moodby.jpg";
import shopItemSheet from "../assets/shop-item-sheet.jpg";
import { shopItems, shopTabs, type ShopItem, type ShopTab } from "../data/shopItems";

type ExpansionScreenProps = {
  coinBalance: number;
  equippedShopItemId?: string | null;
  onEquipShopItem: (itemId: string) => void;
  onPurchaseShopItem: (item: ShopItem) => boolean;
  ownedShopItemIds: string[];
};

export function ExpansionScreen({
  coinBalance,
  equippedShopItemId,
  onEquipShopItem,
  onPurchaseShopItem,
  ownedShopItemIds
}: ExpansionScreenProps) {
  const [activeTab, setActiveTab] = useState<ShopTab>("recommend");
  const [selectedItem, setSelectedItem] = useState<ShopItem>(shopItems[1]);
  const [shopMessage, setShopMessage] = useState("미리보기 중");
  const visibleItems =
    activeTab === "recommend"
      ? shopItems.slice(0, 4)
      : shopItems.filter((item) => item.category === activeTab);

  function handlePreview(item: ShopItem) {
    setSelectedItem(item);
    setShopMessage(ownedShopItemIds.includes(item.id) ? "보유 중" : "미리보기 중");
  }

  function handlePrimaryAction() {
    const isOwned = ownedShopItemIds.includes(selectedItem.id);

    if (selectedItem.purchasable && !isOwned) {
      if (!onPurchaseShopItem(selectedItem)) {
        setShopMessage("재화가 부족해요");
        return;
      }

      setShopMessage("구매 완료");
      return;
    }

    if (isOwned) {
      onEquipShopItem(selectedItem.id);
      setShopMessage("착용 완료");
      return;
    }

    setShopMessage("미리보기 전용 UI");
  }

  const isSelectedOwned = ownedShopItemIds.includes(selectedItem.id);
  const primaryActionLabel =
    equippedShopItemId === selectedItem.id
      ? "착용 중"
      : selectedItem.purchasable && !isSelectedOwned
        ? `${selectedItem.name} 구매하기`
        : "착용하기";

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
        <button aria-label={primaryActionLabel} disabled={equippedShopItemId === selectedItem.id} type="button" onClick={handlePrimaryAction}>
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
              <b><CurrencyIcon />{equippedShopItemId === item.id ? "착용 중" : ownedShopItemIds.includes(item.id) ? "보유" : item.price}</b>
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
