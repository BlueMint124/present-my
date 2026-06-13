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

    expect(screen.getByRole("heading", { name: "승인형 공개 프로필" })).toBeInTheDocument();
  });
});
