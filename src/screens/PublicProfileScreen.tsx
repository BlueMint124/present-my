import { useState } from "react";
import profileBadgeSheet from "../assets/profile-badge-sheet.png";
import { CharacterAvatar } from "../components/CharacterAvatar";
import { characterState } from "../data/demoData";

const profileUrl = "https://moodbe.app/@moodbe.diary";

const badges = [
  { id: "warm-heart", label: "따뜻한 공감", position: "0% 0%" },
  { id: "self-growth", label: "자기 이해", position: "33.333% 0%" },
  { id: "steady-record", label: "꾸준한 기록", position: "66.666% 0%" },
  { id: "open-profile", label: "공개 프로필", position: "100% 0%" }
];

export function PublicProfileScreen() {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copyMessage, setCopyMessage] = useState("URL 복사");

  async function handleCopyUrl() {
    try {
      await navigator.clipboard?.writeText(profileUrl);
      setCopyMessage("URL 복사 완료");
    } catch {
      setCopyMessage("발표용 URL 복사 완료");
    }
  }

  return (
    <section className="app-screen profile-screen">
      <header className="app-header app-header--center">
        <span>‹</span>
        <h1>공개 프로필</h1>
        <button type="button">편집</button>
      </header>

      <div className="approved-badge">승인 완료</div>

      <article className="soft-card profile-card">
        <div className="profile-sparkles"><span /><span /><span /></div>
        <CharacterAvatar character={characterState} variant="profile" />
        <div>
          <h2>무드비의 하루</h2>
          <small>@moodbe.diary</small>
          <p>따뜻한 마음으로 오늘을 기록하는 Moodbe 공개 프로필이에요.</p>
        </div>
      </article>

      <div className="stats-row">
        <span>기록한 날<b>45</b></span>
        <span>좋아요<b>128</b></span>
        <span>응원<b>87</b></span>
      </div>

      <section className="badge-section">
        <div className="badge-section-header">
          <h2>대표 배지</h2>
          <small>친구에게 보여주기 좋은 Moodbe 인증</small>
        </div>
        <div className="profile-badge-grid">
          {badges.map((badge) => (
            <article className="profile-badge-card" key={badge.id}>
              <i
                aria-hidden="true"
                className="profile-badge-art"
                style={{ backgroundImage: `url(${profileBadgeSheet})`, backgroundPosition: badge.position }}
              />
              <strong>{badge.label}</strong>
            </article>
          ))}
        </div>
      </section>

      {isShareOpen && (
        <article className="profile-share-panel" aria-label="프로필 공유 미리보기">
          <div>
            <span>Share Preview</span>
            <strong>Moodbe 공개 프로필</strong>
            <small>{profileUrl}</small>
          </div>
          <p>발표용 공유 화면입니다. 실제 앱에서는 친구에게 프로필 링크와 대표 배지가 함께 공유돼요.</p>
        </article>
      )}

      <button className="primary-action" type="button" onClick={() => setIsShareOpen(true)}>
        프로필 공유하기
      </button>
      <button className="text-action" type="button" onClick={handleCopyUrl}>
        {copyMessage}
      </button>
    </section>
  );
}
