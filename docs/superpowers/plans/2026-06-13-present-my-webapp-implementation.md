# Present My Webapp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a presentation-ready webapp MVP that demonstrates private diary input, self-understanding analysis, weekly character updates, approved public profile sharing, and UI-only monetization screens.

**Architecture:** Use a static React/Vite app with typed sample data and pure presentation logic. The app will not call a backend or payment/ad service; all analysis, character, profile, shop, ads, and payment states are represented through deterministic sample data so the demo is stable during presentation.

**Tech Stack:** Vite, React, TypeScript, Vitest, React Testing Library, CSS modules via plain `src/styles.css`, no backend.

---

## File Structure

- Create `package.json`: npm scripts and dependencies.
- Create `index.html`: Vite HTML entry.
- Create `tsconfig.json`: TypeScript config.
- Create `tsconfig.node.json`: Vite config TypeScript support.
- Create `vite.config.ts`: Vite + React + Vitest config.
- Create `src/main.tsx`: React root bootstrap.
- Create `src/App.tsx`: top-level app shell, navigation, page switching.
- Create `src/App.test.tsx`: smoke and navigation tests.
- Create `src/types.ts`: shared diary, insight, character, profile, and commerce UI types.
- Create `src/data/demoData.ts`: stable Korean demo data for presentation.
- Create `src/data/demoData.test.ts`: data integrity tests.
- Create `src/lib/profile.ts`: pure helpers for approved public profile items.
- Create `src/lib/profile.test.ts`: privacy and approval tests.
- Create `src/components/AppShell.tsx`: reusable layout and nav.
- Create `src/components/CharacterAvatar.tsx`: CSS-based character visual.
- Create `src/components/StatusPill.tsx`: small reusable status badge.
- Create `src/screens/HomeScreen.tsx`: dashboard.
- Create `src/screens/DiaryScreen.tsx`: prompt-based diary UI.
- Create `src/screens/InsightsScreen.tsx`: private analysis UI.
- Create `src/screens/CharacterScreen.tsx`: weekly character update UI.
- Create `src/screens/PublicProfileScreen.tsx`: approval and sharing UI.
- Create `src/screens/ExpansionScreen.tsx`: UI-only shop, ads, payment, achievement screens.
- Create `src/styles.css`: global responsive design and emotional character app tone.
- Modify `.gitignore`: add Node build artifacts.
- Keep `brainstorm-board.html` and `docs/superpowers/specs/2026-06-13-self-introduction-app-design.md` unchanged.

## Task 1: Scaffold Vite React App

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `src/main.tsx`
- Modify: `.gitignore`

- [ ] **Step 1: Create package metadata and scripts**

Create `package.json`:

```json
{
  "name": "present-my",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --host 127.0.0.1",
    "build": "tsc -b && vite build",
    "preview": "vite preview --host 127.0.0.1",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@vitejs/plugin-react": "^5.0.0",
    "vite": "^7.0.0",
    "typescript": "^5.5.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/user-event": "^14.5.0",
    "jsdom": "^25.0.0",
    "vitest": "^2.1.0"
  }
}
```

- [ ] **Step 2: Create HTML entry**

Create `index.html`:

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Present My</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Create TypeScript configs**

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

Create `tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 4: Create Vite config**

Create `vite.config.ts`:

```ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    globals: true
  }
});
```

- [ ] **Step 5: Create minimal React entry**

Create `src/main.tsx`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 6: Update gitignore**

Modify `.gitignore`:

```gitignore
.superpowers/
node_modules/
dist/
coverage/
```

- [ ] **Step 7: Install dependencies**

Run: `npm install`

Expected: `package-lock.json` is created and npm exits with code `0`.

- [ ] **Step 8: Commit scaffold**

Run:

```bash
git add .gitignore package.json package-lock.json index.html tsconfig.json tsconfig.node.json vite.config.ts src/main.tsx
git commit -m "chore: scaffold presentation webapp"
```

## Task 2: Add Demo Data and Privacy Helpers

**Files:**
- Create: `src/types.ts`
- Create: `src/data/demoData.ts`
- Create: `src/data/demoData.test.ts`
- Create: `src/lib/profile.ts`
- Create: `src/lib/profile.test.ts`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Create test setup**

Create `src/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 2: Define shared types**

Create `src/types.ts`:

```ts
export type ScreenId = "home" | "diary" | "insights" | "character" | "profile" | "expansion";

export type DiaryPrompt = {
  id: string;
  label: string;
  answer: string;
};

export type InsightMetric = {
  label: string;
  value: string;
  description: string;
};

export type CharacterState = {
  name: string;
  level: string;
  weeklyTheme: string;
  expression: string;
  unlockedItems: string[];
  nextUpdate: string;
};

export type PublicProfileItem = {
  id: string;
  title: string;
  body: string;
  approved: boolean;
};

export type ExpansionCard = {
  title: string;
  status: "UI only" | "Demo ready";
  description: string;
};
```

- [ ] **Step 3: Add demo data**

Create `src/data/demoData.ts`:

```ts
import type { CharacterState, DiaryPrompt, ExpansionCard, InsightMetric, PublicProfileItem } from "../types";

export const diaryPrompts: DiaryPrompt[] = [
  { id: "mood", label: "오늘의 기분", answer: "차분하지만 조금 설렜다" },
  { id: "scene", label: "기억나는 장면", answer: "새로운 카페에서 오래 미뤄둔 생각을 정리했다" },
  { id: "me", label: "나답다고 느낀 순간", answer: "친구 이야기를 끝까지 듣고 조심스럽게 답했다" },
  { id: "liked", label: "오늘 좋아했던 것", answer: "따뜻한 라떼, 조용한 음악, 노을빛" },
  { id: "free", label: "자유 일기", answer: "혼자 있는 시간이 나를 회복시키지만, 좋은 대화도 필요하다는 걸 느꼈다." }
];

export const insightMetrics: InsightMetric[] = [
  { label: "반복 감정", value: "차분함 42%", description: "최근 기록에서 안정과 정리 욕구가 자주 등장합니다." },
  { label: "대표 취향", value: "카페, 산책, 음악", description: "공간과 분위기에 민감하게 반응하는 편입니다." },
  { label: "성향 패턴", value: "느린 친밀감", description: "빠른 친해짐보다 깊은 대화를 선호합니다." },
  { label: "이번 주 키워드", value: "정리, 관찰, 회복", description: "혼자 생각을 다듬는 시간이 중요한 주간입니다." }
];

export const characterState: CharacterState = {
  name: "무드비",
  level: "Week 3",
  weeklyTheme: "조용한 카페 탐색가",
  expression: "편안한 미소",
  unlockedItems: ["머그컵", "노트", "창가 자리", "초록 스카프"],
  nextUpdate: "다음 일요일 밤"
};

export const publicProfileItems: PublicProfileItem[] = [
  { id: "summary", title: "나를 설명하는 한 문장", body: "조용한 공간에서 생각을 정리하고, 깊은 대화를 좋아하는 사람.", approved: true },
  { id: "badges", title: "성향 뱃지", body: "감성 탐색가, 느긋한 대화, 분위기 수집가", approved: true },
  { id: "taste", title: "취향 지도", body: "라떼, 창가 자리, 잔잔한 플레이리스트, 저녁 산책", approved: true },
  { id: "match", title: "나와 잘 맞는 사람", body: "천천히 친해지고 서로의 이야기를 오래 들어주는 사람.", approved: true },
  { id: "talk", title: "대화 시작 추천", body: "요즘 가장 자주 가는 공간은 어디야? / 혼자 있을 때 뭐 하면서 회복해?", approved: true },
  { id: "private", title: "일기 원문", body: "원문은 공개 프로필에 포함되지 않습니다.", approved: false }
];

export const expansionCards: ExpansionCard[] = [
  { title: "아이템 상점", status: "UI only", description: "캐릭터 의상, 방 소품, 배경을 둘러보는 화면입니다." },
  { title: "광고 보상", status: "UI only", description: "광고 시청 후 소량의 재화를 받는 흐름을 설명합니다." },
  { title: "결제 안내", status: "UI only", description: "구글/애플 결제 연동 예정 영역을 발표용으로 보여줍니다." },
  { title: "업적 보상", status: "Demo ready", description: "연속 기록과 주간 업데이트 달성 보상을 보여줍니다." }
];
```

- [ ] **Step 4: Add privacy helper**

Create `src/lib/profile.ts`:

```ts
import type { PublicProfileItem } from "../types";

export function getApprovedProfileItems(items: PublicProfileItem[]) {
  return items.filter((item) => item.approved);
}

export function containsPrivateDiaryItem(items: PublicProfileItem[]) {
  return items.some((item) => item.id === "private" && item.approved);
}
```

- [ ] **Step 5: Add data tests**

Create `src/data/demoData.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { characterState, diaryPrompts, insightMetrics, publicProfileItems } from "./demoData";

describe("demo data", () => {
  it("contains the five diary prompts from the product design", () => {
    expect(diaryPrompts.map((prompt) => prompt.id)).toEqual(["mood", "scene", "me", "liked", "free"]);
  });

  it("has weekly character update information", () => {
    expect(characterState.level).toContain("Week");
    expect(characterState.unlockedItems.length).toBeGreaterThanOrEqual(3);
  });

  it("contains private insights and public profile items", () => {
    expect(insightMetrics.length).toBeGreaterThanOrEqual(4);
    expect(publicProfileItems.some((item) => item.id === "private")).toBe(true);
  });
});
```

Create `src/lib/profile.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { publicProfileItems } from "../data/demoData";
import { containsPrivateDiaryItem, getApprovedProfileItems } from "./profile";

describe("profile privacy helpers", () => {
  it("filters public profile to approved items only", () => {
    const approved = getApprovedProfileItems(publicProfileItems);

    expect(approved.every((item) => item.approved)).toBe(true);
    expect(approved.map((item) => item.id)).not.toContain("private");
  });

  it("detects accidental diary-original approval", () => {
    expect(containsPrivateDiaryItem(publicProfileItems)).toBe(false);
  });
});
```

- [ ] **Step 6: Run tests**

Run: `npm test`

Expected: all tests pass, including `demoData.test.ts` and `profile.test.ts`.

- [ ] **Step 7: Commit data layer**

Run:

```bash
git add src/test/setup.ts src/types.ts src/data/demoData.ts src/data/demoData.test.ts src/lib/profile.ts src/lib/profile.test.ts
git commit -m "feat: add presentation demo data"
```

## Task 3: Build App Shell and Navigation

**Files:**
- Create: `src/components/AppShell.tsx`
- Create: `src/components/StatusPill.tsx`
- Create: `src/App.tsx`
- Create: `src/App.test.tsx`
- Create: `src/styles.css`

- [ ] **Step 1: Create reusable status pill**

Create `src/components/StatusPill.tsx`:

```tsx
type StatusPillProps = {
  children: string;
  tone?: "private" | "public" | "demo";
};

export function StatusPill({ children, tone = "demo" }: StatusPillProps) {
  return <span className={`status-pill status-pill--${tone}`}>{children}</span>;
}
```

- [ ] **Step 2: Create app shell**

Create `src/components/AppShell.tsx`:

```tsx
import type { ReactNode } from "react";
import type { ScreenId } from "../types";

const navItems: Array<{ id: ScreenId; label: string }> = [
  { id: "home", label: "홈" },
  { id: "diary", label: "일기" },
  { id: "insights", label: "분석" },
  { id: "character", label: "캐릭터" },
  { id: "profile", label: "공개 프로필" },
  { id: "expansion", label: "확장 UI" }
];

type AppShellProps = {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  children: ReactNode;
};

export function AppShell({ activeScreen, onNavigate, children }: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">Presentation MVP</p>
          <h1>Present My</h1>
          <p className="sidebar-copy">비공개 일기가 공개 가능한 캐릭터 프로필이 되는 웹앱 데모</p>
        </div>
        <nav aria-label="주요 화면">
          {navItems.map((item) => (
            <button
              className={item.id === activeScreen ? "nav-button nav-button--active" : "nav-button"}
              key={item.id}
              onClick={() => onNavigate(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="main-panel">{children}</main>
    </div>
  );
}
```

- [ ] **Step 3: Create temporary app screens**

Create `src/App.tsx`:

```tsx
import { useState } from "react";
import { AppShell } from "./components/AppShell";
import type { ScreenId } from "./types";

const screenTitles: Record<ScreenId, string> = {
  home: "오늘의 기록 대시보드",
  diary: "프롬프트 기반 일기 작성",
  insights: "비공개 자기이해 분석",
  character: "주간 캐릭터 업데이트",
  profile: "승인형 공개 프로필",
  expansion: "발표용 확장 UI"
};

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>("home");

  return (
    <AppShell activeScreen={activeScreen} onNavigate={setActiveScreen}>
      <section className="page-hero">
        <p className="eyebrow">Demo Flow</p>
        <h2>{screenTitles[activeScreen]}</h2>
        <p>이 화면은 다음 작업에서 실제 발표용 콘텐츠로 채워집니다.</p>
      </section>
    </AppShell>
  );
}
```

- [ ] **Step 4: Create base CSS**

Create `src/styles.css`:

```css
:root {
  color: #22251f;
  background: #f7f3ea;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

button {
  font: inherit;
}

.app-shell {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 28px;
  background: #ffffff;
  border-right: 1px solid #e2dccf;
}

.eyebrow {
  margin: 0 0 8px;
  color: #4f8a5b;
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
}

.sidebar h1,
.page-hero h2 {
  margin: 0;
}

.sidebar-copy {
  color: #686b61;
  line-height: 1.6;
}

.nav-button {
  display: block;
  width: 100%;
  margin-bottom: 8px;
  padding: 12px 14px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  color: #34372f;
  text-align: left;
  cursor: pointer;
}

.nav-button--active,
.nav-button:hover {
  border-color: #cfd8bf;
  background: #edf5ea;
}

.main-panel {
  padding: 32px;
}

.page-hero {
  padding: 28px;
  border: 1px solid #e2dccf;
  border-radius: 8px;
  background: #fff;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 800;
}

.status-pill--private {
  background: #eef0f4;
  color: #455061;
}

.status-pill--public {
  background: #edf5ea;
  color: #2f6b3b;
}

.status-pill--demo {
  background: #fff2d7;
  color: #8a5b26;
}

@media (max-width: 860px) {
  .app-shell {
    grid-template-columns: 1fr;
  }

  .sidebar {
    border-right: 0;
    border-bottom: 1px solid #e2dccf;
  }
}
```

- [ ] **Step 5: Add navigation tests**

Create `src/App.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App navigation", () => {
  it("shows the home dashboard by default", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "오늘의 기록 대시보드" })).toBeInTheDocument();
  });

  it("switches to the public profile screen", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "공개 프로필" }));

    expect(screen.getByRole("heading", { name: "승인형 공개 프로필" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 6: Run tests and build**

Run:

```bash
npm test
npm run build
```

Expected: tests pass and Vite writes `dist/`.

- [ ] **Step 7: Commit shell**

Run:

```bash
git add src/App.tsx src/App.test.tsx src/components/AppShell.tsx src/components/StatusPill.tsx src/styles.css
git commit -m "feat: add app shell navigation"
```

## Task 4: Implement Core Demo Screens

**Files:**
- Create: `src/components/CharacterAvatar.tsx`
- Create: `src/screens/HomeScreen.tsx`
- Create: `src/screens/DiaryScreen.tsx`
- Create: `src/screens/InsightsScreen.tsx`
- Create: `src/screens/CharacterScreen.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`
- Modify: `src/App.test.tsx`

- [ ] **Step 1: Create CSS character component**

Create `src/components/CharacterAvatar.tsx`:

```tsx
import type { CharacterState } from "../types";

type CharacterAvatarProps = {
  character: CharacterState;
};

export function CharacterAvatar({ character }: CharacterAvatarProps) {
  return (
    <div className="character-avatar" aria-label={`${character.name} 캐릭터`}>
      <div className="character-head">
        <div className="character-eye character-eye--left" />
        <div className="character-eye character-eye--right" />
        <div className="character-mouth" />
      </div>
      <div className="character-body">
        <span>{character.weeklyTheme}</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create home screen**

Create `src/screens/HomeScreen.tsx`:

```tsx
import { CharacterAvatar } from "../components/CharacterAvatar";
import { StatusPill } from "../components/StatusPill";
import { characterState, insightMetrics } from "../data/demoData";

export function HomeScreen() {
  return (
    <section className="screen-layout">
      <div className="page-hero">
        <StatusPill tone="private">오늘 기록 대기 중</StatusPill>
        <h2>오늘의 기록이 이번 주 캐릭터를 바꿉니다</h2>
        <p>일기는 비공개로 저장되고, 승인한 요약만 공개 프로필에 반영됩니다.</p>
      </div>
      <div className="dashboard-grid">
        <article className="panel">
          <h3>캐릭터 미리보기</h3>
          <CharacterAvatar character={characterState} />
          <p>{characterState.nextUpdate}에 주간 업데이트가 진행됩니다.</p>
        </article>
        <article className="panel">
          <h3>이번 주 신호</h3>
          {insightMetrics.map((metric) => (
            <div className="metric-row" key={metric.label}>
              <strong>{metric.label}</strong>
              <span>{metric.value}</span>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create diary screen**

Create `src/screens/DiaryScreen.tsx`:

```tsx
import { diaryPrompts } from "../data/demoData";

export function DiaryScreen() {
  return (
    <section className="screen-layout">
      <div className="page-hero">
        <p className="eyebrow">Private Diary</p>
        <h2>짧게 써도 나를 이해할 데이터가 쌓입니다</h2>
        <p>프롬프트는 발표용 샘플 답변으로 채워져 있으며, 실제 저장 기능은 MVP 이후 앱 확장 단계에서 연결합니다.</p>
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
```

- [ ] **Step 4: Create insights screen**

Create `src/screens/InsightsScreen.tsx`:

```tsx
import { StatusPill } from "../components/StatusPill";
import { insightMetrics } from "../data/demoData";

export function InsightsScreen() {
  return (
    <section className="screen-layout">
      <div className="page-hero">
        <StatusPill tone="private">비공개 분석</StatusPill>
        <h2>일기 원문은 공개하지 않고 패턴만 정리합니다</h2>
        <p>분석 결과는 공개 프로필 초안의 재료가 되지만, 사용자가 승인하기 전에는 외부에 보이지 않습니다.</p>
      </div>
      <div className="card-grid">
        {insightMetrics.map((metric) => (
          <article className="panel" key={metric.label}>
            <p className="eyebrow">{metric.label}</p>
            <h3>{metric.value}</h3>
            <p>{metric.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create character screen**

Create `src/screens/CharacterScreen.tsx`:

```tsx
import { CharacterAvatar } from "../components/CharacterAvatar";
import { StatusPill } from "../components/StatusPill";
import { characterState } from "../data/demoData";

export function CharacterScreen() {
  return (
    <section className="screen-layout">
      <div className="page-hero">
        <StatusPill tone="public">매주 핵심 업데이트</StatusPill>
        <h2>{characterState.weeklyTheme}</h2>
        <p>7일치 기록을 묶어 캐릭터의 분위기, 뱃지, 아이템을 바꿉니다.</p>
      </div>
      <div className="dashboard-grid">
        <article className="panel">
          <CharacterAvatar character={characterState} />
        </article>
        <article className="panel">
          <h3>이번 주 해금</h3>
          <div className="chip-list">
            {characterState.unlockedItems.map((item) => (
              <span className="chip" key={item}>{item}</span>
            ))}
          </div>
          <p>매일은 작은 반응, 매주는 의미 있는 캐릭터 변화, 매월은 리포트로 정리됩니다.</p>
        </article>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Wire screens into App**

Replace `src/App.tsx` with:

```tsx
import { useState } from "react";
import { AppShell } from "./components/AppShell";
import { CharacterScreen } from "./screens/CharacterScreen";
import { DiaryScreen } from "./screens/DiaryScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { InsightsScreen } from "./screens/InsightsScreen";
import type { ScreenId } from "./types";

const pendingScreenCopy: Record<"profile" | "expansion", { title: string; body: string }> = {
  profile: {
    title: "승인형 공개 프로필",
    body: "다음 작업에서 승인된 항목만 공유 카드에 담는 화면으로 교체됩니다."
  },
  expansion: {
    title: "발표용 확장 UI",
    body: "다음 작업에서 상점, 광고, 결제, 업적의 UI-only 화면으로 교체됩니다."
  }
};

function PendingScreen({ screen }: { screen: "profile" | "expansion" }) {
  const copy = pendingScreenCopy[screen];

  return (
    <section className="page-hero">
      <p className="eyebrow">Next Screen</p>
      <h2>{copy.title}</h2>
      <p>{copy.body}</p>
    </section>
  );
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>("home");

  return (
    <AppShell activeScreen={activeScreen} onNavigate={setActiveScreen}>
      {activeScreen === "home" && <HomeScreen />}
      {activeScreen === "diary" && <DiaryScreen />}
      {activeScreen === "insights" && <InsightsScreen />}
      {activeScreen === "character" && <CharacterScreen />}
      {activeScreen === "profile" && <PendingScreen screen="profile" />}
      {activeScreen === "expansion" && <PendingScreen screen="expansion" />}
    </AppShell>
  );
}
```

- [ ] **Step 7: Extend CSS for screens**

Append to `src/styles.css`:

```css
.screen-layout {
  display: grid;
  gap: 20px;
}

.dashboard-grid,
.card-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.panel,
.prompt-card {
  padding: 20px;
  border: 1px solid #e2dccf;
  border-radius: 8px;
  background: #fff;
}

.metric-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #ece6da;
}

.prompt-list {
  display: grid;
  gap: 12px;
}

.prompt-card span {
  display: block;
  margin-bottom: 8px;
  font-weight: 800;
}

.prompt-card textarea {
  width: 100%;
  min-height: 72px;
  resize: vertical;
  border: 1px solid #ddd6c8;
  border-radius: 8px;
  padding: 12px;
  background: #fbfaf6;
  color: #34372f;
}

.character-avatar {
  display: grid;
  place-items: center;
  gap: 10px;
  min-height: 260px;
  border-radius: 8px;
  background: linear-gradient(150deg, #dfead8, #f7dfb7);
}

.character-head {
  position: relative;
  width: 132px;
  height: 116px;
  border-radius: 48% 52% 44% 56%;
  background: #fff9e8;
  box-shadow: inset 0 -12px 0 #f3d9ad;
}

.character-eye {
  position: absolute;
  top: 44px;
  width: 12px;
  height: 16px;
  border-radius: 50%;
  background: #30342b;
}

.character-eye--left {
  left: 38px;
}

.character-eye--right {
  right: 38px;
}

.character-mouth {
  position: absolute;
  left: 54px;
  top: 72px;
  width: 24px;
  height: 10px;
  border-bottom: 3px solid #30342b;
  border-radius: 999px;
}

.character-body {
  padding: 10px 14px;
  border-radius: 999px;
  background: #2f5f50;
  color: #fff;
  font-weight: 800;
}

.chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0;
}

.chip {
  padding: 8px 10px;
  border-radius: 999px;
  background: #edf5ea;
  color: #2f6b3b;
  font-weight: 800;
}

@media (max-width: 860px) {
  .dashboard-grid,
  .card-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 8: Update navigation test expectations**

Modify `src/App.test.tsx` so the default heading assertion expects the final home heading:

```tsx
expect(screen.getByRole("heading", { name: "오늘의 기록이 이번 주 캐릭터를 바꿉니다" })).toBeInTheDocument();
```

- [ ] **Step 9: Run tests and build**

Run:

```bash
npm test
npm run build
```

Expected: all tests pass and build succeeds.

- [ ] **Step 10: Commit core screens**

Run:

```bash
git add src
git commit -m "feat: build core presentation screens"
```

## Task 5: Implement Public Profile and Expansion UI

**Files:**
- Create: `src/screens/PublicProfileScreen.tsx`
- Create: `src/screens/ExpansionScreen.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Create public profile screen**

Create `src/screens/PublicProfileScreen.tsx`:

```tsx
import { CharacterAvatar } from "../components/CharacterAvatar";
import { StatusPill } from "../components/StatusPill";
import { characterState, publicProfileItems } from "../data/demoData";
import { getApprovedProfileItems } from "../lib/profile";

export function PublicProfileScreen() {
  const approvedItems = getApprovedProfileItems(publicProfileItems);

  return (
    <section className="screen-layout">
      <div className="page-hero">
        <StatusPill tone="public">사용자 승인 후 공개</StatusPill>
        <h2>친구에게 보여주는 캐릭터 프로필</h2>
        <p>AI가 제안한 항목 중 사용자가 승인한 내용만 공유 카드에 포함됩니다.</p>
      </div>
      <div className="profile-preview">
        <article className="panel">
          <CharacterAvatar character={characterState} />
          <button className="primary-action" type="button">공유 링크 복사</button>
          <button className="secondary-action" type="button">명함 이미지 저장</button>
        </article>
        <article className="panel">
          <h3>공개 항목</h3>
          {approvedItems.map((item) => (
            <div className="approval-row" key={item.id}>
              <span aria-hidden="true">✓</span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </div>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create expansion screen**

Create `src/screens/ExpansionScreen.tsx`:

```tsx
import { StatusPill } from "../components/StatusPill";
import { expansionCards } from "../data/demoData";

export function ExpansionScreen() {
  return (
    <section className="screen-layout">
      <div className="page-hero">
        <StatusPill tone="demo">발표용 UI</StatusPill>
        <h2>상점, 광고, 결제는 비즈니스 모델을 보여주는 화면입니다</h2>
        <p>실제 결제와 광고 기능은 연결하지 않고, 앱 확장 가능성을 이해시키는 UI로만 제공합니다.</p>
      </div>
      <div className="card-grid">
        {expansionCards.map((card) => (
          <article className="panel" key={card.title}>
            <p className="eyebrow">{card.status}</p>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire final screens**

Modify `src/App.tsx` imports:

```tsx
import { ExpansionScreen } from "./screens/ExpansionScreen";
import { PublicProfileScreen } from "./screens/PublicProfileScreen";
```

Modify the two temporary branches in `src/App.tsx`:

```tsx
{activeScreen === "profile" && <PublicProfileScreen />}
{activeScreen === "expansion" && <ExpansionScreen />}
```

- [ ] **Step 4: Add profile styles**

Append to `src/styles.css`:

```css
.profile-preview {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 16px;
}

.approval-row {
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 10px;
  padding: 12px 0;
  border-bottom: 1px solid #ece6da;
}

.approval-row span {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #edf5ea;
  color: #2f6b3b;
  font-weight: 900;
}

.approval-row p {
  margin: 4px 0 0;
  color: #606458;
}

.primary-action,
.secondary-action {
  width: 100%;
  margin-top: 10px;
  padding: 12px 14px;
  border-radius: 8px;
  cursor: pointer;
}

.primary-action {
  border: 1px solid #2f5f50;
  background: #2f5f50;
  color: #fff;
}

.secondary-action {
  border: 1px solid #cfd8bf;
  background: #fff;
  color: #2f5f50;
}

@media (max-width: 860px) {
  .profile-preview {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 5: Add tests for profile and expansion navigation**

Append to `src/App.test.tsx`:

```tsx
it("shows approved public profile items without diary original", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "공개 프로필" }));

  expect(screen.getByRole("heading", { name: "친구에게 보여주는 캐릭터 프로필" })).toBeInTheDocument();
  expect(screen.getByText("일기 원문")).not.toBeInTheDocument();
});

it("shows monetization as UI-only presentation content", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "확장 UI" }));

  expect(screen.getByRole("heading", { name: "상점, 광고, 결제는 비즈니스 모델을 보여주는 화면입니다" })).toBeInTheDocument();
  expect(screen.getByText("아이템 상점")).toBeInTheDocument();
});
```

- [ ] **Step 6: Run tests and build**

Run:

```bash
npm test
npm run build
```

Expected: all tests pass and build succeeds.

- [ ] **Step 7: Commit final screens**

Run:

```bash
git add src
git commit -m "feat: add public profile and expansion screens"
```

## Task 6: Presentation Polish and Verification

**Files:**
- Modify: `src/styles.css`
- Modify: `README.md`

- [ ] **Step 1: Create README**

Create `README.md`:

```md
# Present My

발표용 자기소개 웹앱 MVP입니다.

## Concept

비공개 일기를 기반으로 자기이해 분석을 만들고, 사용자가 승인한 항목만 캐릭터 공개 프로필로 공유합니다.

## Demo Flow

1. 홈에서 오늘 기록 상태와 캐릭터를 확인합니다.
2. 일기 화면에서 프롬프트 기반 기록을 확인합니다.
3. 분석 화면에서 비공개 자기이해 결과를 봅니다.
4. 캐릭터 화면에서 주간 업데이트를 확인합니다.
5. 공개 프로필 화면에서 승인된 항목만 공유되는 구조를 설명합니다.
6. 확장 UI 화면에서 상점, 광고, 결제, 업적의 향후 수익화 가능성을 설명합니다.

## Commands

```bash
npm install
npm run dev
npm test
npm run build
```
```

- [ ] **Step 2: Run full verification**

Run:

```bash
npm test
npm run build
```

Expected: tests pass and production build succeeds.

- [ ] **Step 3: Start local dev server**

Run: `npm run dev`

Expected: Vite prints a local URL such as `http://127.0.0.1:5173/`.

- [ ] **Step 4: Browser QA**

Open the Vite URL in the in-app browser. Verify:

- 홈 shows the diary-to-character value proposition.
- 일기 shows five prompt fields.
- 분석 states the content is private.
- 캐릭터 explains weekly updates.
- 공개 프로필 excludes the diary original and includes sharing actions.
- 확장 UI marks commerce features as presentation UI.
- At desktop width, no cards overlap.
- At mobile width around 390px, navigation and cards stack vertically.

- [ ] **Step 5: Commit polish**

Run:

```bash
git add README.md src/styles.css
git commit -m "docs: add presentation demo instructions"
```

## Self-Review Checklist

- Spec coverage:
  - Private diary input is covered by Task 4.
  - Private analysis is covered by Task 4.
  - Weekly character updates are covered by Task 4.
  - Approved public profile sharing is covered by Task 5.
  - UI-only shop, ads, payment, and achievements are covered by Task 5.
  - Webapp presentation framing is covered by Task 1 and Task 6.

- Placeholder scan:
  - The plan avoids backend, payment, ad, and auth implementation because the approved scope is presentation UI.
  - The plan uses deterministic sample data for stable demo behavior.

- Type consistency:
  - `ScreenId`, `DiaryPrompt`, `InsightMetric`, `CharacterState`, `PublicProfileItem`, and `ExpansionCard` are defined in Task 2 and reused in later tasks.
  - `getApprovedProfileItems` is defined in Task 2 and used in Task 5.
