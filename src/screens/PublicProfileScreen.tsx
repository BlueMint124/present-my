import { CharacterAvatar } from "../components/CharacterAvatar";
import { characterState } from "../data/demoData";

export function PublicProfileScreen() {
  return (
    <section className="app-screen profile-screen">
      <header className="app-header app-header--center">
        <span>‹</span>
        <h1>공개 프로필</h1>
        <button type="button">편집</button>
      </header>

      <div className="approved-badge">⊙ 승인 완료</div>

      <article className="soft-card profile-card">
        <div className="profile-sparkles"><span /><span /><span /></div>
        <CharacterAvatar character={characterState} variant="profile" />
        <div>
          <h2>무드비의 하루</h2>
          <small>@moodby.diary</small>
          <p>따뜻한 마음으로, 오늘을 기록해요.</p>
        </div>
      </article>

      <div className="stats-row">
        <span>기록한 날<b>45</b></span>
        <span>좋아요<b>128</b></span>
        <span>응원<b>87</b></span>
      </div>

      <section className="badge-section">
        <h2>대표 배지</h2>
        <div>
          <span>♥</span>
          <span>☘</span>
          <span>★</span>
          <span>✿</span>
        </div>
      </section>

      <button className="primary-action" type="button">프로필 공유하기</button>
      <button className="text-action" type="button">URL 복사</button>
    </section>
  );
}
