import { diaryPrompts } from "../data/demoData";

export function DiaryScreen() {
  return (
    <section className="screen-layout">
      <div className="page-hero">
        <p className="eyebrow">Private Diary</p>
        <h2>깊게 기록할수록 나를 이해하는 데이터가 쌓입니다</h2>
        <p>프롬프트는 발표용 샘플 입력으로 채워져 있으며, 실제 저장 기능은 MVP 이후 앱 확장 단계에서 연결합니다.</p>
      </div>
      <div className="mood-picker" aria-label="오늘의 기분">
        <button type="button">편안</button>
        <button className="selected" type="button">차분</button>
        <button type="button">설렘</button>
        <button type="button">외로움</button>
      </div>
      <div className="prompt-list">
        {diaryPrompts.map((prompt) => (
          <label className="prompt-card" key={prompt.id}>
            <span>{prompt.label}</span>
            <textarea defaultValue={prompt.answer} readOnly />
          </label>
        ))}
      </div>
    </section>
  );
}
