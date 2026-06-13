import { CharacterAvatar } from "../components/CharacterAvatar";
import { characterState } from "../data/demoData";

const journeyItems = [
  { icon: "book", title: "Private Diary", body: "비공개 일기" },
  { icon: "chart", title: "Self Insights", body: "자기 이해" },
  { icon: "moodby", title: "Character Growth", body: "캐릭터 성장" },
  { icon: "world", title: "Public Profile", body: "공개 프로필" }
];

const moodbyTraits = [
  ["따뜻한 공감", "당신의 감정을 잘 들어줘요"],
  ["기록을 좋아해요", "일기와 메모가 즐거워요"],
  ["함께 성장해요", "기록할수록 더 단단해져요"],
  ["작은 기쁨 수집가", "소소한 행복을 모아요"]
];

const phoneScreens = [
  {
    number: "1",
    title: "Home Dashboard",
    className: "phone-home",
    content: "home"
  },
  {
    number: "2",
    title: "Write Diary (Prompt)",
    className: "phone-diary",
    content: "diary"
  },
  {
    number: "3",
    title: "Self Insights (Private)",
    className: "phone-insights",
    content: "insights"
  },
  {
    number: "4",
    title: "Weekly Update & Rewards",
    className: "phone-weekly",
    content: "weekly"
  },
  {
    number: "5",
    title: "Public Profile (Approved)",
    className: "phone-profile",
    content: "profile"
  },
  {
    number: "6",
    title: "Shop / Ads / Payment / Achievements",
    className: "phone-shop",
    content: "shop"
  }
] as const;

const palette = [
  ["Sage Green", "#88bf9e"],
  ["Mint", "#cdefdd"],
  ["Coral", "#ff8f7a"],
  ["Butter Yellow", "#fed77a"],
  ["Sky Blue", "#a6d6f5"],
  ["Charcoal", "#343a3a"]
];

export function HomeScreen() {
  return (
    <section className="reference-board" aria-label="Present My visual design board">
      <div className="left-board">
        <header className="brand-hero">
          <h2>Present My<span aria-hidden="true">♥</span></h2>
          <p>내 마음을 기록하고, 나를 이해하고, 세상과 연결되는 일기</p>
        </header>

        <div className="journey-strip">
          {journeyItems.map((item, index) => (
            <div className="journey-step" key={item.title}>
              <div className={`journey-icon journey-icon--${item.icon}`} />
              <strong>{item.title}</strong>
              <span>{item.body}</span>
              {index < journeyItems.length - 1 && <b aria-hidden="true">→</b>}
            </div>
          ))}
        </div>

        <section className="character-design">
          <div className="moodby-copy">
            <h3>Moodby</h3>
            <p>마음의 온도를 기록하는<br />따뜻한 친구, 무드비</p>
            <div className="trait-list">
              {moodbyTraits.map(([title, body]) => (
                <div className="trait-pill" key={title}>
                  <span aria-hidden="true" />
                  <div>
                    <strong>{title}</strong>
                    <small>{body}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <CharacterAvatar character={characterState} variant="hero" />
        </section>

        <section className="turnaround-section">
          <h4>Character Turnaround</h4>
          <div className="turnaround-row">
            {["front", "smile", "side", "back"].map((pose) => (
              <CharacterAvatar character={characterState} variant="mini" pose={pose} key={pose} />
            ))}
          </div>
        </section>

        <section className="system-panel">
          <div className="palette-panel">
            <h4>Color Palette</h4>
            <div className="palette-grid">
              {palette.map(([name, color]) => (
                <div className="palette-chip" key={name}>
                  <span style={{ background: color }} />
                  <strong>{name}</strong>
                  <small>{color}</small>
                </div>
              ))}
            </div>
          </div>
          <div className="components-panel">
            <h4>UI Components</h4>
            <div className="tab-preview">
              <span>홈</span><span>일기</span><span>분석</span><span>캐릭터</span><span>프로필</span>
            </div>
            <div className="button-preview">
              <button type="button">다음으로</button>
              <button type="button">저장하기</button>
            </div>
            <div className="record-preview">
              <span>이번 주 기록</span>
              <b><i /></b>
              <strong>5 / 7일</strong>
            </div>
          </div>
        </section>
      </div>

      <div className="phone-board">
        {phoneScreens.map((screen) => (
          <article className="phone-showcase" key={screen.number}>
            <div className="phone-title-row">
              <span>{screen.number}</span>
              <strong>{screen.title}</strong>
            </div>
            <div className={`phone-frame ${screen.className}`}>
              <PhoneContent content={screen.content} />
            </div>
          </article>
        ))}
      </div>

      <footer className="board-footer">
        <div><span className="footer-lock" /> <strong>안전한 비공개 기록</strong><small>내 이야기, 나만 볼 수 있어요</small></div>
        <div><span className="footer-heart" /> <strong>따뜻한 자기 이해</strong><small>분석을 통해 나를 더 알아가요</small></div>
        <div><span className="footer-moodby" /> <strong>귀여운 캐릭터 성장</strong><small>기록할수록 무드비가 성장해요</small></div>
        <div><span className="footer-world" /> <strong>세상과 연결되는 나</strong><small>승인된 프로필로 마음을 나눠요</small></div>
        <p>“기록은 나를 이해하는 가장 따뜻한 선물이에요.” ♥</p>
      </footer>
    </section>
  );
}

function PhoneContent({ content }: { content: (typeof phoneScreens)[number]["content"] }) {
  if (content === "home") {
    return (
      <>
        <div className="phone-header"><strong>Present My</strong><span>⌾</span><CharacterAvatar character={characterState} variant="nav" /></div>
        <div className="soft-card diary-card">
          <span className="lock-badge">▣</span>
          <div><strong>Private Diary</strong><small>이번 주 기록</small><b>5 / 7일</b></div>
          <div className="thin-progress"><i /></div>
          <button type="button">일기 쓰러 가기</button>
        </div>
        <div className="soft-card preview-card">
          <strong>Weekly Character Preview</strong>
          <small>이번 주 무드비</small>
          <CharacterAvatar character={characterState} variant="phone" />
          <p>따뜻한 하루였어요.<br />나를 잘 챙긴 한 주예요! 🌿</p>
        </div>
        <div className="mood-row"><span>😀</span><span>🙂</span><span>😐</span><span>😟</span><span>😌</span><span>😍</span></div>
        <PhoneNav active="홈" />
      </>
    );
  }

  if (content === "diary") {
    return (
      <>
        <div className="phone-header"><span>‹</span><strong>일기 쓰기</strong><small>저장</small></div>
        <div className="prompt-area">
          <small>오늘의 질문 <b>1 / 3</b></small>
          <h4>오늘 가장 마음을 움직였던 순간은<br />언제였나요?</h4>
          <CharacterAvatar character={characterState} variant="phone" />
          <textarea readOnly value={"자유롭게 적어보세요...\n마음속 이야기가 모두 소중해요."} />
        </div>
        <div className="attach-row"><span>사진</span><span>기분</span><span>태그</span><span>음성</span></div>
        <button className="wide-green" type="button">다음 질문</button>
      </>
    );
  }

  if (content === "insights") {
    return (
      <>
        <div className="phone-header"><span>☰</span><strong>분석</strong><span>↻</span></div>
        <div className="insight-tabs"><b>인사이트</b><span>감정 패턴</span><span>키워드</span><span>성장 기록</span></div>
        <div className="soft-card insight-main">
          <small>오늘의 인사이트</small>
          <h4>당신은 스스로를<br />잘 돌보고 있어요.</h4>
          <p>최근 일기에서 ‘나를 위한 시간’이 많아졌어요.</p>
          <CharacterAvatar character={characterState} variant="phone" />
        </div>
        <div className="two-cards"><div><strong>나의 강점</strong><b>따뜻함</b><small>섬세한 공감</small></div><div><strong>집중 포인트</strong><b>완벽주의</b><small>스스로를 더 칭찬</small></div></div>
        <div className="soft-card ratio-card"><span>최근 감정 비율</span><div className="donut-chart" /></div>
        <PhoneNav active="분석" />
      </>
    );
  }

  if (content === "weekly") {
    return (
      <>
        <div className="weekly-visual">
          <h4>Weekly Update</h4>
          <strong>무드비가 성장했어요!</strong>
          <small>이번 주도 멋지게 기록했어요 ✨</small>
          <CharacterAvatar character={characterState} variant="picnic" />
        </div>
        <div className="level-card"><b>Lv. 12</b><span><i /></span><small>320 / 500</small></div>
        <h5>새로 잠금 해제된 아이템</h5>
        <div className="reward-grid"><div>포근한 담요</div><div>나무 랜턴</div><div>초록 머그컵</div></div>
        <button className="wide-green" type="button">모두 확인했어요!</button>
      </>
    );
  }

  if (content === "profile") {
    return (
      <>
        <div className="phone-header"><span>‹</span><strong>공개 프로필</strong><small>편집</small></div>
        <div className="approved-badge">⊙ 승인 완료</div>
        <div className="soft-card profile-card">
          <CharacterAvatar character={characterState} variant="profile" />
          <div><h4>무드비의 하루</h4><small>@moodby.diary</small><p>따뜻한 마음으로, 오늘을 기록해요 🌿</p></div>
        </div>
        <div className="stats-row"><div>기록한 날<b>45</b></div><div>좋아요<b>128</b></div><div>응원<b>87</b></div></div>
        <div className="badge-row"><span>♥</span><span>☘</span><span>★</span><span>✿</span></div>
        <button className="wide-green" type="button">프로필 공유하기</button>
      </>
    );
  }

  return (
    <>
      <div className="phone-header"><strong>상점</strong><span>◎ 320</span><span>•••</span></div>
      <div className="shop-tabs"><span>추천</span><span>아이템</span><span>태마</span><span>꾸미기</span><span>패키지</span></div>
      <div className="shop-banner"><strong>기록할수록 더 특별한 보상!</strong><CharacterAvatar character={characterState} variant="phone" /></div>
      <h5>추천 아이템</h5>
      <div className="shop-grid"><div>햇살 모자<br /><b>80</b></div><div>구름 쿠션<br /><b>80</b></div><div>따뜻한 스탠드<br /><b>120</b></div></div>
      <div className="pay-row"><button type="button">광고 보고 보상 받기</button><button type="button">프리미엄 구독</button></div>
      <PhoneNav active="캐릭터" />
    </>
  );
}

function PhoneNav({ active }: { active: string }) {
  return (
    <nav className="phone-nav" aria-label="phone navigation">
      {["홈", "일기", "분석", "캐릭터", "프로필"].map((item) => (
        <span className={item === active ? "active" : ""} key={item}>{item}</span>
      ))}
    </nav>
  );
}
