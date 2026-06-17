import { useState } from "react";
import characterHeroBg from "../assets/character-hero-bg.jpg";
import characterRewardSheet from "../assets/character-reward-sheet.jpg";
import { CharacterAvatar, type CharacterAnimation } from "../components/CharacterAvatar";
import { characterState } from "../data/demoData";
import type { ShopItem } from "../data/shopItems";

const rewards = [
  {
    name: "초록 스카프",
    description: "무드비의 산책 룩을 따뜻하게 바꿔요.",
    position: "0% 50%"
  },
  {
    name: "나무 랜턴",
    description: "밤 일기 화면에 포근한 빛을 더해요.",
    position: "50% 50%"
  },
  {
    name: "초록 머그컵",
    description: "차분한 기록 루틴을 보여주는 소품이에요.",
    position: "100% 50%"
  }
];

const animationOptions: Array<{ id: CharacterAnimation; label: string }> = [
  { id: "breath", label: "숨쉬기" },
  { id: "wave", label: "팔 흔들기" },
  { id: "smile", label: "웃기" },
  { id: "cry", label: "울기" }
];

type CharacterScreenProps = {
  equippedShopItem?: ShopItem;
};

export function CharacterScreen({ equippedShopItem }: CharacterScreenProps) {
  const [animation, setAnimation] = useState<CharacterAnimation>("wave");
  const [acknowledgedRewards, setAcknowledgedRewards] = useState(false);

  return (
    <section className="app-screen character-screen">
      <article className="weekly-hero">
        <img alt="" className="character-hero-bg" src={characterHeroBg} />
        <div className="weekly-hero-copy">
          <span>Weekly Update</span>
          <h1>무드비가 성장했어요!</h1>
          <p>이번 주 5번의 기록으로 Lv. 12 보상을 열었어요.</p>
        </div>
        <CharacterAvatar animation={animation} character={characterState} equippedShopItem={equippedShopItem} variant="picnic" />
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

      <section className={acknowledgedRewards ? "reward-section reward-section--checked" : "reward-section"}>
        <div className="reward-section-header">
          <div>
            <span>Unlocked</span>
            <h2>새로 잠금 해제된 아이템</h2>
          </div>
          {acknowledgedRewards && <b>보관함 저장됨</b>}
        </div>
        <div className="reward-grid">
          {rewards.map((reward) => (
            <article key={reward.name}>
              <div
                aria-hidden="true"
                className="reward-item-art"
                style={{ backgroundImage: `url(${characterRewardSheet})`, backgroundPosition: reward.position }}
              />
              <strong>{reward.name}</strong>
              <small>{reward.description}</small>
            </article>
          ))}
        </div>
      </section>

      {acknowledgedRewards && (
        <p className="save-feedback" role="status">새 아이템을 보관함에 넣었어요</p>
      )}

      <button
        className="primary-action"
        disabled={acknowledgedRewards}
        type="button"
        onClick={() => setAcknowledgedRewards(true)}
      >
        {acknowledgedRewards ? "확인 완료" : "모두 확인했어요"}
      </button>
    </section>
  );
}
