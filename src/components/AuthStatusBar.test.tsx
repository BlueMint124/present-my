import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AuthStatusBar } from "./AuthStatusBar";

describe("AuthStatusBar", () => {
  it("does not render while auth is disabled for demo mode", () => {
    const { container } = render(
      <AuthStatusBar authEnabled={false} isLoading={false} onSignIn={vi.fn()} onSignOut={vi.fn()} user={null} />
    );

    expect(container.firstChild).toBeNull();
  });

  it("shows a Google login button when auth is enabled without a user", async () => {
    const user = userEvent.setup();
    const onSignIn = vi.fn();

    render(<AuthStatusBar authEnabled isLoading={false} onSignIn={onSignIn} onSignOut={vi.fn()} user={null} />);

    await user.click(screen.getByRole("button", { name: "Google로 시작하기" }));

    expect(onSignIn).toHaveBeenCalledOnce();
  });

  it("shows the signed-in Google profile and logout action", async () => {
    const user = userEvent.setup();
    const onSignOut = vi.fn();

    render(
      <AuthStatusBar
        authEnabled
        isLoading={false}
        onSignIn={vi.fn()}
        onSignOut={onSignOut}
        user={{
          avatarUrl: "https://example.com/avatar.png",
          displayName: "Moodbe Tester",
          email: "tester@example.com",
          id: "google-user-1"
        }}
      />
    );

    expect(screen.getByText("Moodbe Tester")).toBeInTheDocument();
    expect(screen.getByAltText("Moodbe Tester 프로필")).toHaveAttribute("src", "https://example.com/avatar.png");

    await user.click(screen.getByRole("button", { name: "로그아웃" }));

    expect(onSignOut).toHaveBeenCalledOnce();
  });
});
