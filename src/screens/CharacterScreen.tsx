import { useState } from "react";
import { CharacterAvatar, type CharacterAnimation } from "../components/CharacterAvatar";
import { characterState } from "../data/demoData";

const rewards = ["포근한 담요", "나무 랜턴", "초록 머그컵"];
const animationOptions: Array<{ id: CharacterAnimation; label: string }> = [
  { id: "breath", label: "숨쉬기" },
  { id: "wave", label: "팔흔들기" },
  { id: "smile", label: "웃기" },
  { id: "cry", label: "울기" }
];

export function CharacterScreen() {
  const [animation, setAnimation] = useState<CharacterAnimation>("wave");

  return (
    <section className="app-screen character-screen">
      <article className="weekly-hero">
        <div className="picnic-decor"><span /><span /><span /></div>
        <h1>Weekly Update</h1>
        <h2>무드비가 성장했어요!</h2>
        <p>이번 주도 멋지게 기록했어요.</p>
        <CharacterAvatar animation={animation} character={characterState} variant="picnic" />
      </article>

      <div className="animation-controls" aria-label="캐릭터 애니메이션">
        {animationOptions.map((option) => (
          <button
            className={animation === option.id ? "active" : ""}
            key={option.id}
            onClick={() => setAnimation(option.id)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>

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
