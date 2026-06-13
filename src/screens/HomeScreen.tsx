import { CharacterAvatar } from "../components/CharacterAvatar";
import { characterState } from "../data/demoData";

const moods = ["월", "화", "수", "목", "금", "토", "일"];

export function HomeScreen() {
  return (
    <section className="app-screen home-screen">
      <header className="app-header">
        <h1>Present My</h1>
        <div className="header-actions">
          <span aria-label="알림">⌾</span>
          <CharacterAvatar character={characterState} variant="nav" />
        </div>
      </header>

      <article className="soft-card diary-summary">
        <div className="lock-tile">▣</div>
        <div className="summary-copy">
          <strong>Private Diary</strong>
          <small>이번 주 기록</small>
          <b>5 / 7일</b>
        </div>
        <div className="progress-track"><span /></div>
        <button type="button">일기 쓰러 가기</button>
      </article>

      <article className="soft-card character-preview">
        <div className="scene-sky"><span /><span /><span /></div>
        <div>
          <strong>Weekly Character Preview</strong>
          <small>이번 주 무드비</small>
        </div>
        <CharacterAvatar character={characterState} variant="phone" />
        <p>따뜻한 하루였어요. 나를 잘 챙긴 한 주예요.</p>
        <button type="button">자세히 보기</button>
      </article>

      <article className="mood-panel">
        <h2>감정 흐름</h2>
        <div className="mood-dots">
          {moods.map((day, index) => (
            <span className={index >= 4 ? "warm" : ""} key={day}>
              <i />
              {day}
            </span>
          ))}
        </div>
      </article>

      <article className="mini-story-card">
        <span>오늘의 작은 발견</span>
        <strong>창가 자리에서 마음이 조금 가벼워졌어요.</strong>
      </article>
    </section>
  );
}
