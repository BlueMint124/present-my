import { useState } from "react";
import { CharacterAvatar } from "../components/CharacterAvatar";
import { characterState, diaryPrompts } from "../data/demoData";
import type { DiaryEntry } from "../types";

const emptyDiaryMessage = "일기 내용을 먼저 적어주세요.";
const incompleteDiaryMessage = "5개 질문을 모두 채워주세요.";
const savedDiaryMessage = "일기가 저장됐어요";

type DiaryMode = "write" | "review" | "library" | "detail";

type DiaryScreenProps = {
  diaryEntries?: DiaryEntry[];
  onSaveDiary?: (entry: DiaryEntry) => void;
};

export function DiaryScreen({ diaryEntries = [], onSaveDiary }: DiaryScreenProps) {
  const [mode, setMode] = useState<DiaryMode>("write");
  const [promptIndex, setPromptIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [saveMessage, setSaveMessage] = useState("");
  const currentPrompt = diaryPrompts[promptIndex];
  const content = answers[currentPrompt.id] ?? "";
  const completedAnswers = diaryPrompts.map((prompt) => ({
    ...prompt,
    answer: (answers[prompt.id] ?? "").trim()
  }));
  const allPromptsAnswered = completedAnswers.every((answer) => answer.answer.length > 0);

  function updateCurrentAnswer(value: string) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentPrompt.id]: value
    }));
    setSaveMessage("");
  }

  function handleNextPrompt() {
    if (promptIndex < diaryPrompts.length - 1) {
      setPromptIndex((currentIndex) => currentIndex + 1);
      setSaveMessage("");
      return;
    }

    if (!allPromptsAnswered) {
      setSaveMessage(incompleteDiaryMessage);
      return;
    }

    setMode("review");
    setSaveMessage("");
  }

  function createDiaryEntry() {
    const joinedContent = completedAnswers
      .map((answer) => `${answer.label}\n${answer.answer}`)
      .join("\n\n");

    return {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      mood: "차분",
      prompt: "오늘의 다이어리",
      content: joinedContent,
      tags: ["private", "self-understanding", "diary-session"]
    };
  }

  function handleSaveCurrentPrompt() {
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

  function handleSaveDiarySession() {
    if (!allPromptsAnswered) {
      setSaveMessage(incompleteDiaryMessage);
      return;
    }

    const entry = createDiaryEntry();
    onSaveDiary?.(entry);
    setAnswers({});
    setPromptIndex(0);
    setSelectedEntry(entry);
    setSaveMessage(savedDiaryMessage);
    setMode("library");
  }

  function openLibrary() {
    setMode("library");
    setSelectedEntry(null);
    setSaveMessage("");
  }

  function startNewDiary() {
    setMode("write");
    setSelectedEntry(null);
    setSaveMessage("");
  }

  function openEntry(entry: DiaryEntry) {
    setSelectedEntry(entry);
    setMode("detail");
    setSaveMessage("");
  }

  const headerTitle = mode === "library" ? "다이어리 책장" : mode === "detail" ? "다이어리 보기" : "일기 쓰기";

  return (
    <section className="app-screen diary-screen">
      <header className="app-header app-header--center">
        <span>‹</span>
        <h1>{headerTitle}</h1>
        {mode === "write" && <button type="button" onClick={handleSaveCurrentPrompt}>저장</button>}
        {mode === "review" && <button type="button" onClick={startNewDiary}>수정</button>}
        {(mode === "library" || mode === "detail") && <button type="button" onClick={startNewDiary}>쓰기</button>}
      </header>

      <div className="diary-mode-tabs" aria-label="일기 보기 방식">
        <button className={mode === "write" || mode === "review" ? "active" : ""} type="button" onClick={startNewDiary}>
          새 일기
        </button>
        <button className={mode === "library" || mode === "detail" ? "active" : ""} type="button" onClick={openLibrary}>
          책장
        </button>
      </div>

      {mode === "write" && (
        <>
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

          <button className="primary-action" type="button" onClick={handleNextPrompt}>
            {promptIndex === diaryPrompts.length - 1 ? "일기 정리하기" : "다음 질문"}
          </button>
        </>
      )}

      {mode === "review" && (
        <article className="diary-review-card">
          <span className="diary-bookmark">Private Diary</span>
          <h2>오늘의 다이어리</h2>
          <p>5개의 질문을 한 권의 작은 다이어리로 정리했어요.</p>
          <div className="diary-review-list">
            {completedAnswers.map((answer) => (
              <section key={answer.id}>
                <strong>{answer.label}</strong>
                <p>{answer.answer}</p>
              </section>
            ))}
          </div>
          {saveMessage && <p className="save-feedback" role="status">{saveMessage}</p>}
          <button className="primary-action" type="button" onClick={handleSaveDiarySession}>
            다이어리에 저장하기
          </button>
        </article>
      )}

      {mode === "library" && (
        <section className="diary-library">
          <div className="diary-library-heading">
            <span>Bookshelf</span>
            <h2>나의 다이어리 책장</h2>
            <p>저장한 마음 기록을 다시 꺼내 볼 수 있어요.</p>
          </div>
          {saveMessage && <p className="save-feedback" role="status">{saveMessage}</p>}
          {diaryEntries.length === 0 ? (
            <article className="diary-empty-book">
              <strong>아직 꽂힌 다이어리가 없어요.</strong>
              <p>5개의 질문을 채우면 오늘의 다이어리가 이 책장에 저장돼요.</p>
            </article>
          ) : (
            <div className="diary-bookshelf">
              {diaryEntries.map((entry, index) => (
                <button
                  aria-label={`${entry.prompt} 열기`}
                  className="diary-book-card"
                  key={entry.id}
                  type="button"
                  onClick={() => openEntry(entry)}
                >
                  <span>{index + 1}</span>
                  <strong>{entry.prompt}</strong>
                  <small>{formatDiaryDate(entry.createdAt)}</small>
                  <p>{entry.content.split("\n").filter(Boolean).slice(0, 2).join(" · ")}</p>
                </button>
              ))}
            </div>
          )}
        </section>
      )}

      {mode === "detail" && selectedEntry && (
        <article className="diary-detail-card">
          <button className="diary-back-button" type="button" onClick={openLibrary}>책장으로</button>
          <span>{formatDiaryDate(selectedEntry.createdAt)}</span>
          <h2>저장된 다이어리</h2>
          <strong>{selectedEntry.prompt}</strong>
          <pre>{selectedEntry.content}</pre>
        </article>
      )}
    </section>
  );
}

function formatDiaryDate(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short"
  }).format(new Date(date));
}
