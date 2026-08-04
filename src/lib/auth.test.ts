import { describe, expect, it, vi } from "vitest";
import { getAuthDisplayName, getAuthRedirectUrl, signInWithGoogle, signOutOfMoodbe } from "./auth";

describe("auth helpers", () => {
  it("starts Supabase Google OAuth with the current app origin", async () => {
    const signInWithOAuth = vi.fn().mockResolvedValue({ error: null });
    const authClient = {
      auth: {
        signInWithOAuth
      }
    };

    await signInWithGoogle(authClient);

    expect(signInWithOAuth).toHaveBeenCalledWith({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000"
      }
    });
  });

  it("uses an explicit auth redirect URL when the deployment provides one", () => {
    expect(getAuthRedirectUrl("http://localhost:3000", "https://moodbe.vercel.app/")).toBe("https://moodbe.vercel.app");
  });

  it("signs out through the Supabase auth client", async () => {
    const signOut = vi.fn().mockResolvedValue({ error: null });
    const authClient = {
      auth: {
        signOut
      }
    };

    await signOutOfMoodbe(authClient);

    expect(signOut).toHaveBeenCalledOnce();
  });

  it("uses Google profile metadata before falling back to email", () => {
    expect(getAuthDisplayName({ email: "fallback@example.com", user_metadata: { full_name: "Moodbe User" } })).toBe(
      "Moodbe User"
    );
    expect(getAuthDisplayName({ email: "fallback@example.com", user_metadata: {} })).toBe("fallback@example.com");
  });
});
