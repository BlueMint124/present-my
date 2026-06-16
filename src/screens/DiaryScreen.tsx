import { useState } from "react";
import { CharacterAvatar } from "../components/CharacterAvatar";
import { characterState, diaryPrompts } from "../data/demoData";
import type { DiaryEntry } from "../types";

const emptyDiaryMessage = "일기 내용을 먼저 적어주세요.";
const savedDiaryMessage = "일기가 저장됐어요";

type DiaryScreenProps = {
  onSaveDiary?: (entry: DiaryEntry) => void;
};

export function DiaryScreen({ onSaveDiary }: DiaryScreenProps) {
  const [promptIndex, setPromptIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [saveMessage, setSaveMessage] = useState("");
  const currentPrompt = diaryPrompts[promptIndex];
  const content = answers[currentPrompt.id] ?? "";

  function updateCurrentAnswer(value: string) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentPrompt.id]: value
    }));
    setSaveMessage("");
  }

  function handleNextPrompt() {
    setPromptIndex((currentIndex) => (currentIndex + 1) % diaryPrompts.length);
    setSaveMessage("");
  }

  function handleSave() {
    const trimmedContent = content.trim();

    if (!trimmedContent) {
      setSaveMessage(emptyDiaryMessage);
      return;
    }

    onSaveDiary?.({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      mood: "차분",
      prompt: currentPrompt.label,
      content: trimmedContent,
      tags: ["private", "self-understanding"]
    });
    setSaveMessage(savedDiaryMessage);
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
          <b>{promptIndex + 1} / {diaryPrompts.length}</b>
        </div>
        <h2>{currentPrompt.label}</h2>
        <CharacterAvatar character={characterState} variant="phone" />
        <textarea
          value={content}
          onChange={(event) => updateCurrentAnswer(event.target.value)}
          placeholder={currentPrompt.answer}
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

      <button className="primary-action" type="button" onClick={handleNextPrompt}>다음 질문</button>
    </section>
  );
}
