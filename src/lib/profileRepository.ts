import type { MoodbeAuthUser } from "./auth";
import { createAccountCode, normalizeNickname, validateNickname } from "./profileOnboarding";
import { supabase } from "./supabaseClient";

export type MoodbeProfile = {
  accountCode: string;
  authProvider: "google";
  authUserId: string;
  avatarUrl?: string;
  displayName: string;
  email?: string;
  id: string;
  nickname?: string;
  onboardingCompleted: boolean;
  publicHandle?: string;
};

type ProfileRow = {
  account_code: string;
  auth_provider: "google";
  auth_user_id: string;
  avatar_url: string | null;
  display_name: string;
  email: string | null;
  id: string;
  nickname: string | null;
  onboarding_completed: boolean;
  public_handle: string | null;
};

type SupabaseProfileClient = {
  from: (table: "profiles") => {
    insert: (values: Record<string, unknown>) => ProfileMutationQuery;
    select: (columns: string) => ProfileSelectQuery;
    update: (values: Record<string, unknown>) => ProfileMutationQuery;
  };
};

type ProfileSelectQuery = {
  eq: (column: string, value: string) => ProfileSelectQuery;
  maybeSingle: () => Promise<{ data: ProfileRow | null; error: Error | null }>;
};

type ProfileMutationQuery = {
  eq: (column: string, value: string) => ProfileMutationQuery;
  select: (columns: string) => ProfileMutationQuery;
  single: () => Promise<{ data: ProfileRow; error: Error | null }>;
};

const profileColumns = [
  "id",
  "auth_user_id",
  "auth_provider",
  "email",
  "avatar_url",
  "display_name",
  "nickname",
  "account_code",
  "public_handle",
  "onboarding_completed"
].join(", ");

export async function bootstrapProfile({
  client = supabase as SupabaseProfileClient | null,
  user
}: {
  client?: SupabaseProfileClient | null;
  user: MoodbeAuthUser;
}) {
  if (!client) {
    return null;
  }

  const { data: existingProfile, error: fetchError } = await client
    .from("profiles")
    .select(profileColumns)
    .eq("auth_user_id", user.id)
    .maybeSingle();

  if (fetchError) {
    throw fetchError;
  }

  if (existingProfile) {
    return mapProfileRow(existingProfile);
  }

  const accountCode = createAccountCode(user.id);
  const { data: createdProfile, error: insertError } = await client
    .from("profiles")
    .insert({
      account_code: accountCode,
      auth_provider: "google",
      auth_user_id: user.id,
      avatar_url: user.avatarUrl ?? null,
      display_name: user.displayName,
      email: user.email ?? null,
      nickname: null,
      onboarding_completed: false,
      public_handle: accountCode
    })
    .select(profileColumns)
    .single();

  if (insertError) {
    throw insertError;
  }

  if (!createdProfile) {
    return null;
  }

  return mapProfileRow(createdProfile);
}

export async function completeProfileOnboarding({
  client = supabase as SupabaseProfileClient | null,
  nickname,
  profileId
}: {
  client?: SupabaseProfileClient | null;
  nickname: string;
  profileId: string;
}) {
  if (!client) {
    return null;
  }

  const validation = validateNickname(nickname);

  if (!validation.valid) {
    throw new Error(validation.message);
  }

  const normalizedNickname = normalizeNickname(nickname);
  const { data, error } = await client
    .from("profiles")
    .update({
      display_name: normalizedNickname,
      nickname: normalizedNickname,
      onboarding_completed: true
    })
    .eq("id", profileId)
    .select(profileColumns)
    .single();

  if (error) {
    throw error;
  }

  return data ? mapProfileRow(data) : null;
}

function mapProfileRow(row: ProfileRow): MoodbeProfile {
  return {
    accountCode: row.account_code,
    authProvider: row.auth_provider,
    authUserId: row.auth_user_id,
    avatarUrl: row.avatar_url ?? undefined,
    displayName: row.display_name,
    email: row.email ?? undefined,
    id: row.id,
    nickname: row.nickname ?? undefined,
    onboardingCompleted: row.onboarding_completed,
    publicHandle: row.public_handle ?? undefined
  };
}
