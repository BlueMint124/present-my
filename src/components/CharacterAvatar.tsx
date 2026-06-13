import type { CharacterState } from "../types";

type CharacterAvatarProps = {
  character: CharacterState;
  variant?: "default" | "hero" | "mini" | "phone";
};

export function CharacterAvatar({ character, variant = "default" }: CharacterAvatarProps) {
  return (
    <div className={`character-avatar character-avatar--${variant}`} aria-label={`${character.name} 캐릭터`}>
      <div className="character-glow" />
      <div className="character-head">
        <div className="character-sprout">
          <span />
          <span />
        </div>
        <div className="character-ear character-ear--left" />
        <div className="character-ear character-ear--right" />
        <div className="character-eye character-eye--left" />
        <div className="character-eye character-eye--right" />
        <div className="character-cheek character-cheek--left" />
        <div className="character-cheek character-cheek--right" />
        <div className="character-mouth" />
      </div>
      <div className="character-scarf" />
      {variant === "hero" && (
        <>
          <div className="character-mug">♡</div>
          <div className="character-book" />
        </>
      )}
      <div className="character-label">
        <strong>{character.name}</strong>
        <span>{character.weeklyTheme}</span>
      </div>
    </div>
  );
}
