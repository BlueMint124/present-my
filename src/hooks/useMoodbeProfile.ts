import { useCallback, useEffect, useState } from "react";
import type { MoodbeAuthUser } from "../lib/auth";
import {
  bootstrapProfile,
  completeProfileOnboarding,
  type MoodbeProfile
} from "../lib/profileRepository";

type MoodbeProfileState = {
  completeOnboarding: (nickname: string) => Promise<void>;
  error: string | null;
  isLoading: boolean;
  isSaving: boolean;
  profile: MoodbeProfile | null;
};

export function useMoodbeProfile(user: MoodbeAuthUser | null): MoodbeProfileState {
  const [profile, setProfile] = useState<MoodbeProfile | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(user));
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setIsLoading(false);
      return;
    }

    let isCurrent = true;
    setIsLoading(true);
    setError(null);

    bootstrapProfile({ user })
      .then((nextProfile) => {
        if (isCurrent) {
          setProfile(nextProfile);
        }
      })
      .catch((profileError: Error) => {
        if (isCurrent) {
          setError(profileError.message);
        }
      })
      .finally(() => {
        if (isCurrent) {
          setIsLoading(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [user]);

  const completeOnboarding = useCallback(
    async (nickname: string) => {
      if (!profile) {
        return;
      }

      setIsSaving(true);
      setError(null);

      try {
        const updatedProfile = await completeProfileOnboarding({ nickname, profileId: profile.id });
        setProfile(updatedProfile);
      } catch (profileError) {
        setError(profileError instanceof Error ? profileError.message : "프로필 저장에 실패했어요.");
      } finally {
        setIsSaving(false);
      }
    },
    [profile]
  );

  return {
    completeOnboarding,
    error,
    isLoading,
    isSaving,
    profile
  };
}
