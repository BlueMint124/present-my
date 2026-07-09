import { describe, expect, it, vi } from "vitest";
import { bootstrapProfile, completeProfileOnboarding } from "./profileRepository";

function makeSelectQuery(data: unknown) {
  return {
    eq: vi.fn().mockReturnThis(),
    maybeSingle: vi.fn().mockResolvedValue({ data, error: null })
  };
}

function makeMutationQuery(data: unknown) {
  return {
    eq: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data, error: null })
  };
}

describe("profileRepository", () => {
  it("returns an existing profile by auth user id", async () => {
    const existingProfile = {
      account_code: "mb_existing",
      auth_provider: "google",
      auth_user_id: "auth-user-1",
      avatar_url: "https://example.com/avatar.png",
      display_name: "기존 사용자",
      email: "user@example.com",
      id: "profile-1",
      nickname: "기존 사용자",
      onboarding_completed: true,
      public_handle: "mb_existing"
    };
    const selectQuery = makeSelectQuery(existingProfile);
    const client = {
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue(selectQuery)
      })
    };

    const profile = await bootstrapProfile({
      client,
      user: {
        avatarUrl: "https://example.com/avatar.png",
        displayName: "Google User",
        email: "user@example.com",
        id: "auth-user-1"
      }
    });

    expect(client.from).toHaveBeenCalledWith("profiles");
    expect(selectQuery.eq).toHaveBeenCalledWith("auth_user_id", "auth-user-1");
    expect(profile).toMatchObject({
      accountCode: "mb_existing",
      id: "profile-1",
      onboardingCompleted: true
    });
  });

  it("creates an incomplete onboarding profile when none exists", async () => {
    const selectQuery = makeSelectQuery(null);
    const createdProfile = {
      account_code: "mb_created",
      auth_provider: "google",
      auth_user_id: "auth-user-2",
      avatar_url: null,
      display_name: "Google User",
      email: "new@example.com",
      id: "profile-2",
      nickname: null,
      onboarding_completed: false,
      public_handle: "mb_created"
    };
    const insertQuery = makeMutationQuery(createdProfile);
    const table = {
      insert: vi.fn().mockReturnValue(insertQuery),
      select: vi.fn().mockReturnValue(selectQuery)
    };
    const client = {
      from: vi.fn().mockReturnValue(table)
    };

    const profile = await bootstrapProfile({
      client,
      user: {
        displayName: "Google User",
        email: "new@example.com",
        id: "auth-user-2"
      }
    });

    expect(table.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        auth_provider: "google",
        auth_user_id: "auth-user-2",
        display_name: "Google User",
        email: "new@example.com",
        nickname: null,
        onboarding_completed: false
      })
    );
    expect(profile?.onboardingCompleted).toBe(false);
  });

  it("saves nickname and marks onboarding complete", async () => {
    const updatedProfile = {
      account_code: "mb_done",
      auth_provider: "google",
      auth_user_id: "auth-user-3",
      avatar_url: null,
      display_name: "무드비 친구",
      email: "done@example.com",
      id: "profile-3",
      nickname: "무드비 친구",
      onboarding_completed: true,
      public_handle: "mb_done"
    };
    const updateQuery = makeMutationQuery(updatedProfile);
    const table = {
      update: vi.fn().mockReturnValue(updateQuery)
    };
    const client = {
      from: vi.fn().mockReturnValue(table)
    };

    const profile = await completeProfileOnboarding({
      client,
      nickname: "  무드비   친구  ",
      profileId: "profile-3"
    });

    expect(table.update).toHaveBeenCalledWith({
      display_name: "무드비 친구",
      nickname: "무드비 친구",
      onboarding_completed: true
    });
    expect(updateQuery.eq).toHaveBeenCalledWith("id", "profile-3");
    expect(profile?.nickname).toBe("무드비 친구");
  });
});
