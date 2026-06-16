import { useState } from "react";
import { CharacterAvatar } from "../components/CharacterAvatar";
import { characterState } from "../data/demoData";
import { emptyDiaryAnalysis } from "../lib/diaryAnalysis";
import type { DiaryAnalysis } from "../types";

type InsightTab = "insight" | "emotion" | "keywords" | "growth";

type InsightsScreenProps = {
  analysis?: DiaryAnalysis;
};

const insightTabs: Array<{ id: InsightTab; label: string }> = [
  { id: "insight", label: "인사이트" },
  { id: "emotion", label: "감정 패턴" },
  { id: "keywords", label: "키워드" },
  { id: "growth", label: "성장 기록" }
];

export function InsightsScreen({ analysis = emptyDiaryAnalysis }: InsightsScreenProps) {
  const [activeTab, setActiveTab] = useState<InsightTab>("insight");
  const keywordText = analysis.keywords.length > 0 ? analysis.keywords.join(", ") : "기록 대기";

  return (
    <section className="app-screen insights-screen">
      <header className="app-header">
        <span>☰</span>
        <h1>분석</h1>
        <span>↻</span>
      </header>

      <div className="segmented-tabs">
        {insightTabs.map((tab) => (
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

      {activeTab === "insight" && <InsightPanel analysis={analysis} keywordText={keywordText} />}
      {activeTab === "emotion" && <EmotionPanel analysis={analysis} />}
      {activeTab === "keywords" && <KeywordPanel analysis={analysis} keywordText={keywordText} />}
      {activeTab === "growth" && <GrowthPanel analysis={analysis} />}
    </section>
  );
}

function InsightPanel({ analysis, keywordText }: { analysis: DiaryAnalysis; keywordText: string }) {
  return (
    <>
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

      <EmotionRatio analysis={analysis} />
    </>
  );
}

function EmotionPanel({ analysis }: { analysis: DiaryAnalysis }) {
  return (
    <>
      <article className="soft-card analysis-panel">
        <small>감정 패턴</small>
        <h2>감정 흐름 해석</h2>
        <p>
          가장 크게 잡힌 감정은 {analysis.emotionPattern.primary.label}이고, 함께 따라온 흐름은{" "}
          {analysis.emotionPattern.secondary.label}이에요.
        </p>
      </article>

      <div className="emotion-bars">
        {[analysis.emotionPattern.primary, analysis.emotionPattern.secondary].map((emotion) => (
          <article className="soft-card" key={emotion.label}>
            <div>
              <strong>{emotion.label}</strong>
              <span>{emotion.percentage}%</span>
            </div>
            <i style={{ width: `${emotion.percentage}%` }} />
          </article>
        ))}
      </div>

      <article className="soft-card analysis-note">
        <strong>무드비의 제안</strong>
        <p>{analysis.focus}을 너무 큰 숙제로 만들지 말고, 오늘은 한 문장으로 이름 붙이는 것부터 해봐요.</p>
      </article>
    </>
  );
}

function KeywordPanel({ analysis, keywordText }: { analysis: DiaryAnalysis; keywordText: string }) {
  return (
    <>
      <article className="soft-card analysis-panel">
        <small>키워드</small>
        <h2>키워드 맵</h2>
        <p>{keywordText} 키워드가 최근 일기에서 반복적으로 드러났어요.</p>
      </article>

      <div className="keyword-list">
        {analysis.keywordDetails.length > 0 ? (
          analysis.keywordDetails.map((keyword) => (
            <article className="soft-card" key={keyword.keyword}>
              <b>{keyword.keyword}</b>
              <span>{keyword.count}회</span>
              <p>{keyword.description}</p>
            </article>
          ))
        ) : (
          <article className="soft-card">
            <b>기록 대기</b>
            <p>일기를 저장하면 반복 키워드가 이곳에 쌓여요.</p>
          </article>
        )}
      </div>
    </>
  );
}

function GrowthPanel({ analysis }: { analysis: DiaryAnalysis }) {
  return (
    <>
      <article className="soft-card analysis-panel">
        <small>성장 기록</small>
        <h2>성장 기록 카드</h2>
        <p>비공개 일기에서 발견한 변화만 모아, 나중에 캐릭터 성장과 공개 프로필로 연결할 수 있어요.</p>
      </article>

      <div className="growth-list">
        {analysis.growthRecords.length > 0 ? (
          analysis.growthRecords.map((record) => (
            <article className="soft-card" key={record.title}>
              <span>{record.tone === "shareable" ? "공개 후보" : "비공개"}</span>
              <strong>{record.title}</strong>
              <p>{record.body}</p>
            </article>
          ))
        ) : (
          <article className="soft-card">
            <span>비공개</span>
            <strong>첫 기록을 기다리는 중</strong>
            <p>저장된 일기가 생기면 성장 기록이 자동으로 만들어져요.</p>
          </article>
        )}
      </div>
    </>
  );
}

function EmotionRatio({ analysis }: { analysis: DiaryAnalysis }) {
  return (
    <article className="soft-card ratio-card">
      <div>
        <strong>최근 감정 비율</strong>
        <span><i className="green" />{analysis.emotionPattern.primary.label} {analysis.emotionPattern.primary.percentage}%</span>
        <span><i className="yellow" />{analysis.emotionPattern.secondary.label} {analysis.emotionPattern.secondary.percentage}%</span>
      </div>
      <div className="donut-chart" />
    </article>
  );
}
