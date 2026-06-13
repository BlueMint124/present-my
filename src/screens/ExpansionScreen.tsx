import { CharacterAvatar } from "../components/CharacterAvatar";
import { characterState } from "../data/demoData";

const items = [
  { name: "햇살 모자", price: 80 },
  { name: "구름 쿠션", price: 80 },
  { name: "따뜻한 스탠드", price: 120 }
];

export function ExpansionScreen() {
  return (
    <section className="app-screen shop-screen">
      <header className="app-header">
        <h1>상점</h1>
        <span className="coin-pill">◎ 320</span>
        <span>•••</span>
      </header>

      <div className="shop-tabs">
        {["추천", "아이템", "테마", "꾸미기", "패키지"].map((tab) => (
          <button type="button" key={tab}>{tab}</button>
        ))}
      </div>

      <article className="shop-banner">
        <div className="coin-burst"><span /><span /><span /></div>
        <div>
          <strong>기록할수록 더 특별한 보상!</strong>
          <small>아이템은 발표용 UI입니다</small>
        </div>
        <CharacterAvatar character={characterState} variant="phone" />
      </article>

      <section className="shop-section">
        <h2>추천 아이템</h2>
        <div className="shop-grid">
          {items.map((item) => (
            <article key={item.name}>
              <div />
              <strong>{item.name}</strong>
              <span>◎ {item.price}</span>
            </article>
          ))}
        </div>
      </section>

      <div className="payment-grid">
        <button type="button">광고 보고 보상 받기<b>◎ 30 받기</b></button>
        <button type="button">프리미엄 구독<b>구독하기</b></button>
      </div>
    </section>
  );
}
