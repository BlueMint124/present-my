import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

const mocks = vi.hoisted(() => ({
  authState: {
    authEnabled: true,
    error: null,
    isLoading: false,
    signIn: vi.fn(),
    signOut: vi.fn(),
    user: {
      avatarUrl: "https://example.com/avatar.png",
      displayName: "Google Name",
      email: "tester@example.com",
      id: "auth-user-1"
    }
  },
  profileState: {
    completeOnboarding: vi.fn(),
    error: null,
    isLoading: false,
    isSaving: false,
    profile: {
      accountCode: "mb_ab12cd34",
      authProvider: "google" as const,
      authUserId: "auth-user-1",
      avatarUrl: "https://example.com/avatar.png",
      displayName: "Google Name",
      email: "tester@example.com",
      id: "profile-1",
      onboardingCompleted: false,
      publicHandle: "mb_ab12cd34"
    }
  },
  remote: {
    equipOwnedShopItem: vi.fn(),
    fetchDiaryEntries: vi.fn(),
    fetchPlayerProgress: vi.fn(),
    insertDiaryEntry: vi.fn(),
    updatePlayerProgress: vi.fn(),
    upsertOwnedShopItem: vi.fn()
  }
}));

vi.mock("./hooks/useSupabaseAuth", () => ({
  useSupabaseAuth: () => mocks.authState
}));

vi.mock("./hooks/useMoodbeProfile", () => ({
  useMoodbeProfile: () => mocks.profileState
}));

vi.mock("./lib/supabaseRepository", () => mocks.remote);

function getNavigationButtons() {
  return within(screen.getByRole("navigation")).getAllByRole("button");
}

describe("App authenticated profile flow", () => {
  beforeEach(() => {
    localStorage.clear();
    mocks.profileState.completeOnboarding.mockReset();
    mocks.remote.equipOwnedShopItem.mockReset();
    mocks.remote.fetchDiaryEntries.mockReset().mockResolvedValue([]);
    mocks.remote.fetchPlayerProgress.mockReset().mockResolvedValue(null);
    mocks.remote.insertDiaryEntry.mockReset().mockImplementation((entry) => Promise.resolve(entry));
    mocks.remote.updatePlayerProgress.mockReset().mockImplementation((_profileId, progress) => Promise.resolve(progress));
    mocks.remote.upsertOwnedShopItem.mockReset().mockResolvedValue(undefined);
    mocks.authState.user = {
      avatarUrl: "https://example.com/avatar.png",
      displayName: "Google Name",
      email: "tester@example.com",
      id: "auth-user-1"
    };
    mocks.profileState.profile = {
      accountCode: "mb_ab12cd34",
      authProvider: "google",
      authUserId: "auth-user-1",
      avatarUrl: "https://example.com/avatar.png",
      displayName: "Google Name",
      email: "tester@example.com",
      id: "profile-1",
      onboardingCompleted: false,
      publicHandle: "mb_ab12cd34"
    };
  });

  it("shows nickname onboarding before entering the app", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByLabelText("Moodbe 프로필 설정")).toBeInTheDocument();
    expect(screen.getByText("mb_ab12cd34")).toBeInTheDocument();

    await user.clear(screen.getByLabelText("닉네임"));
    await user.type(screen.getByLabelText("닉네임"), "무드비 친구");
    await user.click(screen.getByRole("button", { name: "Moodbe 시작하기" }));

    expect(mocks.profileState.completeOnboarding).toHaveBeenCalledWith("무드비 친구");
  });

  it("loads and writes diary and progress data with the signed-in profile id", async () => {
    const user = userEvent.setup();
    mocks.profileState.profile = {
      ...mocks.profileState.profile,
      onboardingCompleted: true
    };

    render(<App />);

    await waitFor(() => expect(mocks.remote.fetchDiaryEntries).toHaveBeenCalledWith("profile-1"));
    await waitFor(() => expect(mocks.remote.fetchPlayerProgress).toHaveBeenCalledWith("profile-1"));

    await user.click(getNavigationButtons()[1]);
    await user.type(screen.getByRole("textbox"), "오늘은 로그인 저장 테스트를 했다.");

    const saveButton = document.querySelector<HTMLButtonElement>(".app-header--center button");
    expect(saveButton).toBeInstanceOf(HTMLButtonElement);
    await user.click(saveButton as HTMLButtonElement);

    await waitFor(() => expect(mocks.remote.insertDiaryEntry).toHaveBeenCalled());
    expect(mocks.remote.insertDiaryEntry.mock.calls[0][1]).toBe("profile-1");
    expect(mocks.remote.updatePlayerProgress).toHaveBeenCalledWith(
      "profile-1",
      expect.objectContaining({ totalDiaryEntries: 1 })
    );
  });
});
