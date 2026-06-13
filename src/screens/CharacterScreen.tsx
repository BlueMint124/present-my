import { CharacterAvatar } from "../components/CharacterAvatar";
import { StatusPill } from "../components/StatusPill";
import { characterState } from "../data/demoData";

export function CharacterScreen() {
  return (
    <section className="screen-layout">
      <div className="page-hero">
        <StatusPill tone="public">매주 일요일 업데이트</StatusPill>
        <h2>{characterState.weeklyTheme}</h2>
        <p>7일치 기록을 묶어 캐릭터의 분위기, 배지, 아이템을 바꾸는 주간 성장 화면입니다.</p>
      </div>
      <div className="dashboard-grid">
        <article className="panel character-panel">
          <CharacterAvatar character={characterState} />
        </article>
        <article className="panel">
          <h3>이번 주 잠금 해제</h3>
          <div className="chip-list">
            {characterState.unlockedItems.map((item) => (
              <span className="chip" key={item}>{item}</span>
            ))}
          </div>
          <p>매일은 작은 반응, 매주는 눈에 보이는 캐릭터 변화와 월간 리포트로 정리합니다.</p>
        </article>
      </div>
    </section>
  );
}
