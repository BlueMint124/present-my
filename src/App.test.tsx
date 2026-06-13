import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App navigation", () => {
  it("shows the mobile home dashboard by default", () => {
    render(<App />);

    expect(screen.getByLabelText("Present My mobile web app")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Present My" })).toBeInTheDocument();
    expect(screen.getByText("Private Diary")).toBeInTheDocument();
    expect(screen.getByText("Weekly Character Preview")).toBeInTheDocument();
  });

  it("navigates between the core app screens", async () => {
    const user = userEvent.setup();
    render(<App />);
    const navigation = screen.getByRole("navigation", { name: "주요 화면" });

    await user.click(within(navigation).getByRole("button", { name: /일기/ }));
    expect(screen.getByRole("heading", { name: "일기 쓰기" })).toBeInTheDocument();

    await user.click(within(navigation).getByRole("button", { name: /분석/ }));
    expect(screen.getByRole("heading", { name: "분석" })).toBeInTheDocument();

    await user.click(within(navigation).getByRole("button", { name: /캐릭터/ }));
    expect(screen.getByRole("heading", { name: "무드비가 성장했어요!" })).toBeInTheDocument();
  });

  it("shows public profile and shop as app tabs", async () => {
    const user = userEvent.setup();
    render(<App />);
    const navigation = screen.getByRole("navigation", { name: "주요 화면" });

    await user.click(within(navigation).getByRole("button", { name: /프로필/ }));
    expect(screen.getByRole("heading", { name: "공개 프로필" })).toBeInTheDocument();
    expect(screen.getByText("프로필 공유하기")).toBeInTheDocument();

    await user.click(within(navigation).getByRole("button", { name: /상점/ }));
    expect(screen.getByRole("heading", { name: "상점" })).toBeInTheDocument();
    expect(screen.getByText("아이템은 발표용 UI입니다")).toBeInTheDocument();
  });
});
