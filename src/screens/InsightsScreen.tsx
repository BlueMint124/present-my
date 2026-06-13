import { CharacterAvatar } from "../components/CharacterAvatar";
import { characterState } from "../data/demoData";

export function InsightsScreen() {
  return (
    <section className="app-screen insights-screen">
      <header className="app-header">
        <span>☰</span>
        <h1>분석</h1>
        <span>↻</span>
      </header>

      <div className="segmented-tabs">
        <button className="active" type="button">인사이트</button>
        <button type="button">감정 패턴</button>
        <button type="button">키워드</button>
        <button type="button">성장 기록</button>
      </div>

      <article className="soft-card insight-hero">
        <small>오늘의 인사이트</small>
        <h2>당신은 스스로를 잘 돌보고 있어요.</h2>
        <p>최근 일기에서 ‘나를 위한 시간’이 많아졌어요. 작은 변화가 차분한 회복으로 이어지고 있습니다.</p>
        <CharacterAvatar character={characterState} variant="phone" />
      </article>

      <div className="insight-grid">
        <article>
          <span>나의 강점</span>
          <strong>따뜻함</strong>
          <small>섬세한 공감으로 주변을 편안하게 해요</small>
        </article>
        <article>
          <span>집중 포인트</span>
          <strong className="coral">완벽주의</strong>
          <small>스스로를 더 칭찬해주세요</small>
        </article>
      </div>

      <article className="soft-card ratio-card">
        <div>
          <strong>최근 감정 비율</strong>
          <span><i className="green" />긍정 72%</span>
          <span><i className="yellow" />중립 18%</span>
        </div>
        <div className="donut-chart" />
      </article>
    </section>
  );
}
