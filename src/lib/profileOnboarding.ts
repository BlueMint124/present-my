export function normalizeNickname(nickname: string) {
  return nickname.trim().replace(/\s+/g, " ");
}

export function validateNickname(nickname: string): { message?: string; valid: boolean } {
  const normalizedNickname = normalizeNickname(nickname);

  if (normalizedNickname.length === 0) {
    return { message: "닉네임을 입력해 주세요.", valid: false };
  }

  if (normalizedNickname.length < 2) {
    return { message: "닉네임은 2자 이상이어야 해요.", valid: false };
  }

  if (normalizedNickname.length > 16) {
    return { message: "닉네임은 16자 이하로 입력해 주세요.", valid: false };
  }

  if (!/^[가-힣a-zA-Z0-9\s._-]+$/.test(normalizedNickname) || normalizedNickname.includes("@")) {
    return { message: "닉네임에는 이메일이나 특수문자를 넣지 말아 주세요.", valid: false };
  }

  return { valid: true };
}

export function createAccountCode(authUserId: string) {
  let hash = 2166136261;

  for (let index = 0; index < authUserId.length; index += 1) {
    hash ^= authUserId.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  const code = (hash >>> 0).toString(36).padStart(8, "0").slice(0, 8);
  return `mb_${code}`;
}
