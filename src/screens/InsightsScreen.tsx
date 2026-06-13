import { StatusPill } from "../components/StatusPill";
import { insightMetrics } from "../data/demoData";

export function InsightsScreen() {
  return (
    <section className="screen-layout">
      <div className="page-hero">
        <StatusPill tone="private">비공개 분석</StatusPill>
        <h2>일기 원문은 공개하지 않고 패턴만 정리합니다</h2>
        <p>분석 결과는 공개 프로필 초안의 재료가 되지만, 사용자가 승인하기 전에는 외부에 보이지 않습니다.</p>
      </div>
      <div className="card-grid">
        {insightMetrics.map((metric) => (
          <article className="panel insight-card" key={metric.label}>
            <p className="eyebrow">{metric.label}</p>
            <h3>{metric.value}</h3>
            <p>{metric.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
