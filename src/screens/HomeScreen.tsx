import { CharacterAvatar } from "../components/CharacterAvatar";
import { StatusPill } from "../components/StatusPill";
import { characterState, insightMetrics } from "../data/demoData";

export function HomeScreen() {
  return (
    <section className="screen-layout">
      <div className="page-hero page-hero--home">
        <div>
          <StatusPill tone="private">오늘 기록 대기 중</StatusPill>
          <h2>오늘의 기록이 이번 주 캐릭터를 바꿉니다</h2>
          <p>일기는 비공개로 저장되고, 승인한 요약만 공개 프로필에 반영됩니다.</p>
        </div>
        <div className="weekly-progress" aria-label="주간 기록 진행률">
          <strong>5 / 7</strong>
          <span>주간 업데이트까지</span>
          <div className="progress-track"><div /></div>
        </div>
      </div>
      <div className="dashboard-grid">
        <article className="panel character-panel">
          <h3>캐릭터 미리보기</h3>
          <CharacterAvatar character={characterState} />
          <p>{characterState.nextUpdate}에 주간 업데이트가 진행됩니다.</p>
        </article>
        <article className="panel">
          <h3>이번 주 신호</h3>
          {insightMetrics.map((metric) => (
            <div className="metric-row" key={metric.label}>
              <strong>{metric.label}</strong>
              <span>{metric.value}</span>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}
