import type { MoodbeAuthUser } from "../lib/auth";

type AuthStatusBarProps = {
  authEnabled: boolean;
  error?: string | null;
  isLoading: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
  user: MoodbeAuthUser | null;
};

export function AuthStatusBar({
  authEnabled,
  error,
  isLoading,
  onSignIn,
  onSignOut,
  user
}: AuthStatusBarProps) {
  if (!authEnabled) {
    return null;
  }

  return (
    <aside className="auth-status-bar" aria-label="로그인 상태">
      {user ? (
        <>
          <div className="auth-profile">
            {user.avatarUrl ? <img alt={`${user.displayName} 프로필`} src={user.avatarUrl} /> : <span aria-hidden="true">M</span>}
            <div>
              <strong>{user.displayName}</strong>
              {user.email && <small>{user.email}</small>}
            </div>
          </div>
          <button type="button" onClick={onSignOut}>
            로그아웃
          </button>
        </>
      ) : (
        <>
          <div>
            <strong>내 기록을 계정에 저장하기</strong>
            <small>{error ?? (isLoading ? "로그인 상태 확인 중" : "Google 계정으로 안전하게 시작해요.")}</small>
          </div>
          <button type="button" disabled={isLoading} onClick={onSignIn}>
            Google로 시작하기
          </button>
        </>
      )}
    </aside>
  );
}
