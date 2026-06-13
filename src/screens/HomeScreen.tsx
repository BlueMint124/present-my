import { CharacterAvatar } from "../components/CharacterAvatar";
import { characterState, insightMetrics } from "../data/demoData";

const journeyItems = [
  ["Private Diary", "비공개 일기"],
  ["Self Insights", "자기 이해"],
  ["Character Growth", "캐릭터 성장"],
  ["Public Profile", "공개 프로필"]
];

const phoneScreens = [
  { number: "1", title: "Home Dashboard", body: "Private Diary · 5 / 7일", meta: "Weekly Character Preview" },
  { number: "2", title: "Write Diary", body: "오늘 가장 마음을 움직였던 순간은?", meta: "Prompt 1 / 3" },
  { number: "3", title: "Self Insights", body: "당신은 스스로를 잘 돌보고 있어요.", meta: "감정 패턴 · 키워드" },
  { number: "4", title: "Weekly Update", body: "무드비가 성장했어요!", meta: "Lv. 12 · 새 아이템" },
  { number: "5", title: "Public Profile", body: "승인 완료 · 무드비의 하루", meta: "프로필 공유하기" },
  { number: "6", title: "Shop / Ads", body: "기록할수록 더 특별한 보상", meta: "UI Only" }
];

const palette = ["#88bf9e", "#cdefdd", "#ff8f7a", "#fed77a", "#a6d6f5", "#343a3a"];

export function HomeScreen() {
  return (
    <section className="concept-board">
      <div className="brand-stage">
        <div className="brand-copy">
          <h2>Present My</h2>
          <p>내 마음을 기록하고, 나를 이해하고, 세상과 연결되는 일기</p>
        </div>

        <div className="journey-strip" aria-label="제품 흐름">
          {journeyItems.map(([title, body]) => (
            <div className="journey-item" key={title}>
              <span />
              <strong>{title}</strong>
              <small>{body}</small>
            </div>
          ))}
        </div>

        <div className="moodby-showcase">
          <div>
            <h3>Moodby</h3>
            <p>마음의 온도를 기록하는 따뜻한 친구, 무드비</p>
            <ul>
              <li>따뜻한 공감</li>
              <li>기록을 좋아해요</li>
              <li>함께 성장해요</li>
            </ul>
          </div>
          <CharacterAvatar character={characterState} variant="hero" />
        </div>

        <div className="turnaround">
          {["Front", "Smile", "Side", "Back"].map((label) => (
            <div className="mini-moodby" key={label}>
              <CharacterAvatar character={characterState} variant="mini" />
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="design-system-card">
          <div>
            <h3>Color Palette</h3>
            <div className="palette-row">
              {palette.map((color) => (
                <span key={color} style={{ background: color }} />
              ))}
            </div>
          </div>
          <div>
            <h3>UI Components</h3>
            <div className="component-preview">
              <button type="button">다음으로</button>
              <div className="mini-progress"><span /></div>
            </div>
          </div>
        </div>
      </div>

      <div className="phone-gallery">
        {phoneScreens.map((screen) => (
          <article className="phone-card" key={screen.number}>
            <div className="phone-number">{screen.number}</div>
            <div className="phone-frame">
              <div className="phone-top">
                <strong>{screen.title}</strong>
                <span>♡</span>
              </div>
              <div className="phone-content">
                <div className="phone-panel phone-panel--soft">
                  <small>{screen.meta}</small>
                  <p>{screen.body}</p>
                  {screen.number === "1" && (
                    <div className="progress-track"><div /></div>
                  )}
                  {screen.number === "3" && (
                    <div className="donut" />
                  )}
                  {screen.number === "4" && (
                    <div className="reward-row">
                      <span>담요</span>
                      <span>랜턴</span>
                      <span>머그</span>
                    </div>
                  )}
                </div>
                <CharacterAvatar character={characterState} variant="phone" />
              </div>
              <div className="phone-nav">
                <span>홈</span>
                <span>일기</span>
                <span>분석</span>
                <span>캐릭터</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="bottom-values">
        {insightMetrics.slice(0, 3).map((metric) => (
          <div key={metric.label}>
            <strong>{metric.label}</strong>
            <span>{metric.description}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
