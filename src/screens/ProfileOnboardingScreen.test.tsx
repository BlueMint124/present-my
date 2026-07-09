import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ProfileOnboardingScreen } from "./ProfileOnboardingScreen";

const profile = {
  accountCode: "mb_ab12cd34",
  authProvider: "google" as const,
  authUserId: "auth-user-1",
  avatarUrl: "https://example.com/avatar.png",
  displayName: "Google Name",
  email: "tester@example.com",
  id: "profile-1",
  onboardingCompleted: false,
  publicHandle: "mb_ab12cd34"
};

describe("ProfileOnboardingScreen", () => {
  it("collects a nickname and exposes the immutable account code", async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn().mockResolvedValue(undefined);

    render(<ProfileOnboardingScreen isSaving={false} onComplete={onComplete} profile={profile} />);

    expect(screen.getByText("mb_ab12cd34")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Google Name")).toBeInTheDocument();

    await user.clear(screen.getByLabelText("닉네임"));
    await user.type(screen.getByLabelText("닉네임"), "  무드비 친구  ");
    await user.click(screen.getByRole("button", { name: "Moodbe 시작하기" }));

    expect(onComplete).toHaveBeenCalledWith("무드비 친구");
  });

  it("shows validation feedback before saving an invalid nickname", async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();

    render(<ProfileOnboardingScreen isSaving={false} onComplete={onComplete} profile={profile} />);

    await user.clear(screen.getByLabelText("닉네임"));
    await user.type(screen.getByLabelText("닉네임"), "a");
    await user.click(screen.getByRole("button", { name: "Moodbe 시작하기" }));

    expect(screen.getByText("닉네임은 2자 이상이어야 해요.")).toBeInTheDocument();
    expect(onComplete).not.toHaveBeenCalled();
  });
});
