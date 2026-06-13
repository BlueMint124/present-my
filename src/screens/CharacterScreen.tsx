import { CharacterAvatar } from "../components/CharacterAvatar";
import { StatusPill } from "../components/StatusPill";
import { characterState } from "../data/demoData";

export function CharacterScreen() {
  return (
    <section className="screen-layout">
      <div className="page-hero">
        <StatusPill tone="public">매주 핵심 업데이트</StatusPill>
        <h2>{characterState.weeklyTheme}</h2>
        <p>7일치 기록을 묶어 캐릭터의 분위기, 뱃지, 아이템을 바꿉니다.</p>
      </div>
      <div className="dashboard-grid">
        <article className="panel character-panel">
          <CharacterAvatar character={characterState} />
        </article>
        <article className="panel">
          <h3>이번 주 해금</h3>
          <div className="chip-list">
            {characterState.unlockedItems.map((item) => (
              <span className="chip" key={item}>{item}</span>
            ))}
          </div>
          <p>매일은 작은 반응, 매주는 의미 있는 캐릭터 변화, 매월은 리포트로 정리됩니다.</p>
        </article>
      </div>
    </section>
  );
}
