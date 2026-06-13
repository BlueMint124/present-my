import { StatusPill } from "../components/StatusPill";
import { expansionCards } from "../data/demoData";

export function ExpansionScreen() {
  return (
    <section className="screen-layout">
      <div className="page-hero">
        <StatusPill tone="demo">발표용 UI</StatusPill>
        <h2>상점, 광고, 결제는 비즈니스 모델을 보여주는 화면입니다</h2>
        <p>실제 결제와 광고 기능은 연결하지 않고, 앱 확장 가능성을 이해시키는 UI로만 제공합니다.</p>
      </div>
      <div className="card-grid">
        {expansionCards.map((card) => (
          <article className="panel expansion-card" key={card.title}>
            <p className="eyebrow">{card.status}</p>
            <div className="expansion-visual">{card.title.slice(0, 2)}</div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
