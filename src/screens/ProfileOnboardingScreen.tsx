import { useState } from "react";
import { normalizeNickname, validateNickname } from "../lib/profileOnboarding";
import type { MoodbeProfile } from "../lib/profileRepository";

type ProfileOnboardingScreenProps = {
  error?: string | null;
  isSaving: boolean;
  onComplete: (nickname: string) => Promise<void> | void;
  profile: MoodbeProfile;
};

export function ProfileOnboardingScreen({
  error,
  isSaving,
  onComplete,
  profile
}: ProfileOnboardingScreenProps) {
  const [nickname, setNickname] = useState(profile.nickname ?? profile.displayName);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validation = validateNickname(nickname);
    if (!validation.valid) {
      setValidationMessage(validation.message ?? "닉네임을 확인해 주세요.");
      return;
    }

    setValidationMessage(null);
    await onComplete(normalizeNickname(nickname));
  }

  return (
    <section className="app-screen profile-onboarding-screen" aria-label="Moodbe 프로필 설정">
      <div className="onboarding-hero">
        <span>Google 계정 연결 완료</span>
        <h1>Moodbe에서 사용할 이름을 정해요</h1>
        <p>일기는 비공개로 저장하고, 프로필에는 친구들에게 보여줄 닉네임만 사용해요.</p>
      </div>

      <form className="onboarding-card" onSubmit={handleSubmit}>
        <div className="onboarding-profile">
          {profile.avatarUrl ? <img alt={`${profile.displayName} 프로필`} src={profile.avatarUrl} /> : <b>M</b>}
          <div>
            <strong>{profile.displayName}</strong>
            {profile.email && <small>{profile.email}</small>}
          </div>
        </div>

        <label>
          <span>닉네임</span>
          <input
            aria-label="닉네임"
            disabled={isSaving}
            maxLength={16}
            onChange={(event) => setNickname(event.target.value)}
            value={nickname}
          />
        </label>

        <div className="account-code-card">
          <span>고유 계정 아이디</span>
          <strong>{profile.accountCode}</strong>
          <small>이 값은 계정 식별용으로 생성되며 변경하지 않는 설정으로 관리해요.</small>
        </div>

        {(validationMessage || error) && <p className="onboarding-feedback">{validationMessage ?? error}</p>}

        <button className="primary-action" disabled={isSaving} type="submit">
          {isSaving ? "저장 중..." : "Moodbe 시작하기"}
        </button>
      </form>
    </section>
  );
}
