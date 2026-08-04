import type { Session, User } from "@supabase/supabase-js";
import { shouldUseSupabase, supabase } from "./supabaseClient";

export type MoodbeAuthUser = {
  avatarUrl?: string;
  displayName: string;
  email?: string;
  id: string;
};

type SupabaseAuthLike = {
  auth: {
    signInWithOAuth?: (params: {
      options: { redirectTo: string };
      provider: "google";
    }) => Promise<{ error: Error | null }>;
    signOut?: () => Promise<{ error: Error | null }>;
  };
};

export const isAuthEnabled = shouldUseSupabase && import.meta.env.VITE_USE_SUPABASE_AUTH === "true";

export function getAuthDisplayName(user: Pick<User, "email" | "user_metadata">) {
  const metadata = user.user_metadata ?? {};
  return metadata.full_name ?? metadata.name ?? user.email ?? "Moodbe User";
}

export function toMoodbeAuthUser(user: User): MoodbeAuthUser {
  return {
    avatarUrl: typeof user.user_metadata?.avatar_url === "string" ? user.user_metadata.avatar_url : undefined,
    displayName: getAuthDisplayName(user),
    email: user.email,
    id: user.id
  };
}

export function getAuthUserFromSession(session: Session | null) {
  return session?.user ? toMoodbeAuthUser(session.user) : null;
}

export function getAuthRedirectUrl(
  currentOrigin = window.location.origin,
  configuredRedirectUrl = import.meta.env.VITE_AUTH_REDIRECT_URL
) {
  const redirectUrl = configuredRedirectUrl?.trim() || currentOrigin;
  return redirectUrl.endsWith("/") ? redirectUrl.slice(0, -1) : redirectUrl;
}

export async function signInWithGoogle(authClient: SupabaseAuthLike | null = supabase) {
  if (!authClient) {
    return;
  }

  const { error } = await authClient.auth.signInWithOAuth?.({
    provider: "google",
    options: {
      redirectTo: getAuthRedirectUrl()
    }
  }) ?? { error: null };

  if (error) {
    throw error;
  }
}

export async function signOutOfMoodbe(authClient: SupabaseAuthLike | null = supabase) {
  if (!authClient) {
    return;
  }

  const { error } = await authClient.auth.signOut?.() ?? { error: null };

  if (error) {
    throw error;
  }
}
