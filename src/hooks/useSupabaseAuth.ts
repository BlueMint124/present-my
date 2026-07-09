import { useEffect, useState } from "react";
import { getAuthUserFromSession, isAuthEnabled, signInWithGoogle, signOutOfMoodbe, type MoodbeAuthUser } from "../lib/auth";
import { supabase } from "../lib/supabaseClient";

type AuthState = {
  authEnabled: boolean;
  error: string | null;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  user: MoodbeAuthUser | null;
};

export function useSupabaseAuth(): AuthState {
  const [user, setUser] = useState<MoodbeAuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(isAuthEnabled);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthEnabled || !supabase) {
      setIsLoading(false);
      return;
    }

    let isCurrent = true;
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(getAuthUserFromSession(session));
      setIsLoading(false);
    });

    supabase.auth
      .getSession()
      .then(({ data, error: sessionError }) => {
        if (!isCurrent) {
          return;
        }

        if (sessionError) {
          setError(sessionError.message);
        }

        setUser(getAuthUserFromSession(data.session));
        setIsLoading(false);
      })
      .catch((sessionError: Error) => {
        if (isCurrent) {
          setError(sessionError.message);
          setIsLoading(false);
        }
      });

    return () => {
      isCurrent = false;
      subscription.unsubscribe();
    };
  }, []);

  async function signIn() {
    setError(null);

    try {
      await signInWithGoogle();
    } catch (signInError) {
      setError(signInError instanceof Error ? signInError.message : "Google 로그인에 실패했어요.");
    }
  }

  async function signOut() {
    setError(null);

    try {
      await signOutOfMoodbe();
    } catch (signOutError) {
      setError(signOutError instanceof Error ? signOutError.message : "로그아웃에 실패했어요.");
    }
  }

  return {
    authEnabled: isAuthEnabled,
    error,
    isLoading,
    signIn,
    signOut,
    user
  };
}
