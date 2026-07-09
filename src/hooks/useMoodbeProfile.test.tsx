import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { MoodbeAuthUser } from "../lib/auth";
import { useMoodbeProfile } from "./useMoodbeProfile";

vi.mock("../lib/profileRepository", () => ({
  bootstrapProfile: vi.fn(),
  completeProfileOnboarding: vi.fn()
}));

import { bootstrapProfile, completeProfileOnboarding } from "../lib/profileRepository";

const authUser: MoodbeAuthUser = {
  avatarUrl: "https://example.com/avatar.png",
  displayName: "Google Name",
  email: "tester@example.com",
  id: "auth-user-1"
};

const profile = {
  accountCode: "mb_ab12cd34",
  authProvider: "google" as const,
  authUserId: "auth-user-1",
  avatarUrl: authUser.avatarUrl,
  displayName: authUser.displayName,
  email: authUser.email,
  id: "profile-1",
  onboardingCompleted: false,
  publicHandle: "mb_ab12cd34"
};

describe("useMoodbeProfile", () => {
  beforeEach(() => {
    vi.mocked(bootstrapProfile).mockReset();
    vi.mocked(completeProfileOnboarding).mockReset();
  });

  it("bootstraps the profile for a signed-in auth user", async () => {
    vi.mocked(bootstrapProfile).mockResolvedValue(profile);

    const { result } = renderHook(() => useMoodbeProfile(authUser));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.profile?.id).toBe("profile-1"));

    expect(bootstrapProfile).toHaveBeenCalledWith({ user: authUser });
    expect(result.current.isLoading).toBe(false);
  });

  it("completes nickname onboarding and refreshes the profile state", async () => {
    vi.mocked(bootstrapProfile).mockResolvedValue(profile);
    vi.mocked(completeProfileOnboarding).mockResolvedValue({
      ...profile,
      displayName: "무드비 친구",
      nickname: "무드비 친구",
      onboardingCompleted: true
    });

    const { result } = renderHook(() => useMoodbeProfile(authUser));

    await waitFor(() => expect(result.current.profile?.id).toBe("profile-1"));
    await act(async () => {
      await result.current.completeOnboarding("무드비 친구");
    });

    expect(completeProfileOnboarding).toHaveBeenCalledWith({
      nickname: "무드비 친구",
      profileId: "profile-1"
    });
    expect(result.current.profile?.onboardingCompleted).toBe(true);
    expect(result.current.profile?.displayName).toBe("무드비 친구");
  });
});
