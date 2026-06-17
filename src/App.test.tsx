import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

let writeTextMock: ReturnType<typeof vi.fn>;

function getMainNavigation() {
  return screen.getByRole("navigation");
}

function getNavigationButtons() {
  return within(getMainNavigation()).getAllByRole("button");
}

describe("App navigation", () => {
  beforeEach(() => {
    localStorage.clear();
    writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: writeTextMock
      }
    });
  });

  it("shows the mobile home dashboard by default", () => {
    render(<App />);

    expect(screen.getByLabelText("Moodbe mobile web app")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Moodbe" })).toBeInTheDocument();
    expect(screen.getByText("Private Diary")).toBeInTheDocument();
    expect(screen.getByText("Weekly Character Preview")).toBeInTheDocument();
  });

  it("opens the diary screen from the home diary CTA", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "일기 쓰러 가기" }));

    expect(document.querySelector(".diary-screen")).toBeInTheDocument();
  });

  it("navigates between the core app screens", async () => {
    const user = userEvent.setup();
    render(<App />);
    const navigationButtons = getNavigationButtons();

    await user.click(navigationButtons[1]);
    expect(document.querySelector(".diary-screen")).toBeInTheDocument();

    await user.click(navigationButtons[2]);
    expect(document.querySelector(".insights-screen")).toBeInTheDocument();

    await user.click(navigationButtons[3]);
    expect(document.querySelector(".character-screen")).toBeInTheDocument();
  });

  it("shows public profile and shop as app tabs", async () => {
    const user = userEvent.setup();
    render(<App />);
    const navigationButtons = getNavigationButtons();

    await user.click(navigationButtons[4]);
    expect(document.querySelector(".profile-screen")).toBeInTheDocument();

    await user.click(navigationButtons[5]);
    expect(document.querySelector(".shop-screen")).toBeInTheDocument();
  });

  it("renders premium character assets and acknowledges unlocked items", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(getNavigationButtons()[3]);

    expect(document.querySelector(".character-hero-bg")).toBeInstanceOf(HTMLImageElement);
    expect(document.querySelectorAll(".reward-item-art").length).toBe(3);

    await user.click(screen.getByRole("button", { name: "모두 확인했어요" }));

    expect(screen.getByText("새 아이템을 보관함에 넣었어요")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "확인 완료" })).toBeDisabled();
  });

  it("previews cozy shop items without real payment", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(getNavigationButtons()[5]);

    expect(screen.getByRole("heading", { name: "Moodbe Cozy Shop" })).toBeInTheDocument();
    expect(screen.getByText("발표용 UI")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "구름 쿠션 미리보기" }));

    expect(screen.getByText("미리보기 중")).toBeInTheDocument();
    expect(screen.getAllByText("구름 쿠션").length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: "구름 쿠션 구매하기" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "광고 보고 30 받기" }));
    expect(screen.getAllByText("광고 보상은 발표용 UI입니다").length).toBeGreaterThan(0);
  });

  it("buys the cloud cushion with shop currency and renders premium nav assets", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(getNavigationButtons()[5]);

    expect(screen.getByText("320")).toBeInTheDocument();
    const navAssets = document.querySelectorAll(".bottom-nav__icon-asset");
    expect(navAssets.length).toBe(6);
    expect(navAssets[0]).toBeInstanceOf(SVGElement);

    await user.click(screen.getByRole("button", { name: "구름 쿠션 구매하기" }));

    expect(screen.getByText("240")).toBeInTheDocument();
    expect(screen.getByText("구매 완료")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "착용하기" })).toBeInTheDocument();
  });

  it("shows premium profile badges and presentation share actions", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(getNavigationButtons()[4]);

    expect(screen.getByText("@moodbe.diary")).toBeInTheDocument();
    expect(document.querySelectorAll(".profile-badge-art").length).toBe(4);

    await user.click(screen.getByRole("button", { name: "프로필 공유하기" }));

    expect(screen.getByLabelText("프로필 공유 미리보기")).toBeInTheDocument();
    expect(screen.getByText("Moodbe 공개 프로필")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "URL 복사" }));

    expect(screen.getByRole("button", { name: /URL 복사 완료/ })).toBeInTheDocument();
  });

  it("applies equipped shop items to home and character avatars", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(getNavigationButtons()[5]);
    await user.click(screen.getByRole("button", { name: "구름 쿠션 구매하기" }));
    await user.click(screen.getByRole("button", { name: "착용하기" }));

    expect(screen.getByText("착용 완료")).toBeInTheDocument();

    await user.click(getNavigationButtons()[0]);
    const homeEquippedItem = document.querySelector<HTMLElement>(".character-equipped-item--cloud-cushion");
    expect(homeEquippedItem).toBeInTheDocument();
    expect(homeEquippedItem?.style.backgroundImage).toContain("shop-item-sheet-transparent");

    await user.click(getNavigationButtons()[3]);
    expect(document.querySelector(".character-equipped-item--cloud-cushion")).toBeInTheDocument();
  });

  it("saves a private diary entry and reflects it on the home progress", async () => {
    const user = userEvent.setup();
    const { container, unmount } = render(<App />);

    await user.click(getNavigationButtons()[1]);

    const diaryInput = screen.getByRole("textbox");
    await user.clear(diaryInput);
    await user.type(diaryInput, "오늘은 발표 준비를 하면서 내 마음을 더 잘 설명하고 싶어졌다.");

    const saveButton = container.querySelector(".app-header--center button");
    expect(saveButton).toBeInstanceOf(HTMLButtonElement);
    await user.click(saveButton as HTMLButtonElement);

    expect(screen.getByText("일기가 저장됐어요")).toBeInTheDocument();

    await user.click(getNavigationButtons()[0]);
    expect(screen.getByText("1 / 7일")).toBeInTheDocument();

    unmount();
    render(<App />);
    expect(screen.getByText("1 / 7일")).toBeInTheDocument();
  });

  it("moves through diary prompts with the next question button", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(getNavigationButtons()[1]);

    expect(document.querySelectorAll(".diary-tool-art").length).toBe(4);
    expect(screen.getByRole("button", { name: "사진 추가" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "기분 추가" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "태그 추가" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "음성 추가" })).toBeInTheDocument();
    expect(screen.getByText("1 / 5")).toBeInTheDocument();
    expect(screen.getByText("오늘의 기분")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "다음 질문" }));

    expect(screen.getByText("2 / 5")).toBeInTheDocument();
    expect(screen.getByText("기억나는 장면")).toBeInTheDocument();
  });

  it("summarizes a completed diary session and opens it from the bookshelf", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(getNavigationButtons()[1]);

    for (const answer of ["기분 기록", "장면 기록", "나를 본 시간", "좋았던 것", "자유 기록"]) {
      await user.type(screen.getByRole("textbox"), answer);
      await user.click(screen.getByRole("button", { name: /다음 질문|일기 정리하기/ }));
    }

    expect(screen.getByRole("heading", { name: "오늘의 다이어리" })).toBeInTheDocument();
    expect(screen.getByText("기분 기록")).toBeInTheDocument();
    expect(screen.getByText("자유 기록")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "다이어리에 저장하기" }));

    expect(screen.getByRole("heading", { name: "나의 다이어리 책장" })).toBeInTheDocument();
    expect(screen.getByText("오늘의 다이어리")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /오늘의 다이어리 열기/ }));

    expect(screen.getByRole("heading", { name: "저장된 다이어리" })).toBeInTheDocument();
    expect(screen.getByText(/장면 기록/)).toBeInTheDocument();
  });

  it("shows local diary analysis on the insights screen", async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    await user.click(getNavigationButtons()[1]);
    await user.clear(screen.getByRole("textbox"));
    await user.type(
      screen.getByRole("textbox"),
      "발표 준비가 조금 불안했지만 친구와 이야기하면서 마음이 차분해지고 회복되는 느낌이었다."
    );

    const saveButton = container.querySelector(".app-header--center button");
    await user.click(saveButton as HTMLButtonElement);

    await user.click(getNavigationButtons()[2]);

    expect(await screen.findByText(/불안을/)).toBeInTheDocument();
    expect(screen.getByText("발표, 친구, 회복")).toBeInTheDocument();
  });

  it("opens emotion, keyword, and growth analysis tabs", async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    await user.click(getNavigationButtons()[1]);
    await user.clear(screen.getByRole("textbox"));
    await user.type(
      screen.getByRole("textbox"),
      "발표 준비가 조금 불안했지만 친구와 이야기하면서 마음이 차분해지고 회복되는 느낌이었다."
    );

    const saveButton = container.querySelector(".app-header--center button");
    await user.click(saveButton as HTMLButtonElement);
    await user.click(getNavigationButtons()[2]);

    await user.click(screen.getByRole("button", { name: "감정 패턴" }));
    expect(await screen.findByText("감정 흐름 해석")).toBeInTheDocument();
    expect(screen.getAllByText(/불안/).length).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: "키워드" }));
    expect(screen.getByText("키워드 맵")).toBeInTheDocument();
    expect(screen.getAllByText(/발표/).length).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: "성장 기록" }));
    expect(screen.getByText("성장 기록 카드")).toBeInTheDocument();
    expect(screen.getByText(/자기/)).toBeInTheDocument();
  });
});
