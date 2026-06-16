import { useState } from "react";
import { CharacterAvatar } from "../components/CharacterAvatar";
import { characterState } from "../data/demoData";
import type { DiaryEntry } from "../types";

const diaryPrompt = "오늘 가장 마음을 움직였던 순간은 언제였나요?";
const defaultDiaryText = "자유롭게 적어보세요...\n마음속 이야기가 모두 소중해요.";

type DiaryScreenProps = {
  onSaveDiary?: (entry: DiaryEntry) => void;
};

export function DiaryScreen({ onSaveDiary }: DiaryScreenProps) {
  const [content, setContent] = useState(defaultDiaryText);
  const [saveMessage, setSaveMessage] = useState("");

  function handleSave() {
    const trimmedContent = content.trim();

    if (!trimmedContent) {
      setSaveMessage("일기 내용을 먼저 적어주세요");
      return;
    }

    onSaveDiary?.({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      mood: "차분",
      prompt: diaryPrompt,
      content: trimmedContent,
      tags: ["private", "self-understanding"]
    });
    setSaveMessage("일기가 저장됐어요");
  }

  return (
    <section className="app-screen diary-screen">
      <header className="app-header app-header--center">
        <span>‹</span>
        <h1>일기 쓰기</h1>
        <button type="button" onClick={handleSave}>저장</button>
      </header>

      <article className="prompt-card">
        <div className="prompt-meta">
          <span>오늘의 질문</span>
          <b>1 / 3</b>
        </div>
        <h2>{diaryPrompt}</h2>
        <CharacterAvatar character={characterState} variant="phone" />
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          aria-label="일기 입력"
        />
      </article>

      {saveMessage && <p className="save-feedback" role="status">{saveMessage}</p>}

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
