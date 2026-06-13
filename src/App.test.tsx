import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App navigation", () => {
  it("shows the home dashboard by default", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "오늘의 기록이 이번 주 캐릭터를 바꿉니다" })).toBeInTheDocument();
  });

  it("switches to the public profile screen", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "공개 프로필" }));

    expect(screen.getByRole("heading", { name: "친구에게 보여주는 캐릭터 프로필" })).toBeInTheDocument();
  });

  it("shows approved public profile items without diary original", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "공개 프로필" }));

    expect(screen.getByRole("heading", { name: "친구에게 보여주는 캐릭터 프로필" })).toBeInTheDocument();
    expect(screen.queryByText("일기 원문")).not.toBeInTheDocument();
  });

  it("shows monetization as UI-only presentation content", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "확장 UI" }));

    expect(screen.getByRole("heading", { name: "상점, 광고, 결제는 비즈니스 모델을 보여주는 화면입니다" })).toBeInTheDocument();
    expect(screen.getByText("아이템 상점")).toBeInTheDocument();
  });
});
