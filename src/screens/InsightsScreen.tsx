import { CharacterAvatar } from "../components/CharacterAvatar";
import { characterState } from "../data/demoData";
import { emptyDiaryAnalysis } from "../lib/diaryAnalysis";
import type { DiaryAnalysis } from "../types";

type InsightsScreenProps = {
  analysis?: DiaryAnalysis;
};

export function InsightsScreen({ analysis = emptyDiaryAnalysis }: InsightsScreenProps) {
  const keywordText = analysis.keywords.length > 0 ? analysis.keywords.join(", ") : "기록 대기";

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
        <small>오늘의 인사이트 · {analysis.source === "local" ? "로컬 분석" : "GPT 분석"}</small>
        <h2>{analysis.headline}</h2>
        <p>{analysis.summary}</p>
        <CharacterAvatar character={characterState} variant="phone" />
      </article>

      <div className="insight-grid">
        <article>
          <span>나의 강점</span>
          <strong>{analysis.strength}</strong>
          <small>{analysis.growthNote}</small>
        </article>
        <article>
          <span>집중 포인트</span>
          <strong className="coral">{analysis.focus}</strong>
          <small>오늘의 감정을 판단보다 관찰로 다뤄주세요</small>
        </article>
      </div>

      <article className="soft-card keyword-card">
        <strong>최근 키워드</strong>
        <span>{keywordText}</span>
      </article>

      <article className="soft-card ratio-card">
        <div>
          <strong>최근 감정 비율</strong>
          <span><i className="green" />{analysis.emotionPattern.primary.label} {analysis.emotionPattern.primary.percentage}%</span>
          <span><i className="yellow" />{analysis.emotionPattern.secondary.label} {analysis.emotionPattern.secondary.percentage}%</span>
        </div>
        <div className="donut-chart" />
      </article>
    </section>
  );
}
