import { CharacterAvatar } from "../components/CharacterAvatar";
import { characterState } from "../data/demoData";

const rewards = ["포근한 담요", "나무 랜턴", "초록 머그컵"];

export function CharacterScreen() {
  return (
    <section className="app-screen character-screen">
      <article className="weekly-hero">
        <h1>Weekly Update</h1>
        <h2>무드비가 성장했어요!</h2>
        <p>이번 주도 멋지게 기록했어요.</p>
        <CharacterAvatar character={characterState} variant="picnic" />
      </article>

      <article className="level-card">
        <b>Lv. 12</b>
        <span><i /></span>
        <small>320 / 500</small>
      </article>

      <section className="reward-section">
        <h2>새로 잠금 해제된 아이템</h2>
        <div className="reward-grid">
          {rewards.map((reward) => (
            <article key={reward}>
              <div />
              <strong>{reward}</strong>
            </article>
          ))}
        </div>
      </section>

      <button className="primary-action" type="button">모두 확인했어요!</button>
    </section>
  );
}
