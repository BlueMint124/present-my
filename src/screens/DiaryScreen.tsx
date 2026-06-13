import { CharacterAvatar } from "../components/CharacterAvatar";
import { characterState } from "../data/demoData";

export function DiaryScreen() {
  return (
    <section className="app-screen diary-screen">
      <header className="app-header app-header--center">
        <span>‹</span>
        <h1>일기 쓰기</h1>
        <button type="button">저장</button>
      </header>

      <article className="prompt-card">
        <div className="prompt-meta">
          <span>오늘의 질문</span>
          <b>1 / 3</b>
        </div>
        <h2>오늘 가장 마음을 움직였던 순간은 언제였나요?</h2>
        <CharacterAvatar character={characterState} variant="phone" />
        <textarea
          defaultValue={"자유롭게 적어보세요...\n마음속 이야기가 모두 소중해요."}
          aria-label="일기 입력"
        />
      </article>

      <div className="attach-tools" aria-label="첨부 도구">
        <button type="button"><span>▧</span>사진</button>
        <button type="button"><span>◡</span>기분</button>
        <button type="button"><span>◇</span>태그</button>
        <button type="button"><span>♩</span>음성</button>
      </div>

      <button className="primary-action" type="button">다음 질문</button>
    </section>
  );
}
