import { describe, expect, it } from "vitest";
import { createAccountCode, normalizeNickname, validateNickname } from "./profileOnboarding";

describe("profile onboarding", () => {
  it("creates a stable public account code from the auth user id", () => {
    expect(createAccountCode("11111111-1111-4111-8111-111111111111")).toMatch(/^mb_[a-z0-9]{8}$/);
    expect(createAccountCode("11111111-1111-4111-8111-111111111111")).toBe(
      createAccountCode("11111111-1111-4111-8111-111111111111")
    );
    expect(createAccountCode("22222222-2222-4222-8222-222222222222")).not.toBe(
      createAccountCode("11111111-1111-4111-8111-111111111111")
    );
  });

  it("normalizes nickname spacing before saving", () => {
    expect(normalizeNickname("  무드비   친구  ")).toBe("무드비 친구");
  });

  it("validates nickname length and characters", () => {
    expect(validateNickname("무드비")).toEqual({ valid: true });
    expect(validateNickname("")).toEqual({ message: "닉네임을 입력해 주세요.", valid: false });
    expect(validateNickname("a")).toEqual({ message: "닉네임은 2자 이상이어야 해요.", valid: false });
    expect(validateNickname("이름!".repeat(8))).toEqual({ message: "닉네임은 16자 이하로 입력해 주세요.", valid: false });
    expect(validateNickname("bad@email")).toEqual({ message: "닉네임에는 이메일이나 특수문자를 넣지 말아 주세요.", valid: false });
  });
});
