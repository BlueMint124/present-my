import type { CharacterState } from "../types";

type CharacterAvatarProps = {
  character: CharacterState;
  pose?: string;
  variant?: "default" | "hero" | "mini" | "phone" | "nav" | "picnic" | "profile";
};

export function CharacterAvatar({ character, pose = "front", variant = "default" }: CharacterAvatarProps) {
  return (
    <div
      aria-label={`${character.name} 캐릭터`}
      className={`moodby moodby--${variant} moodby--pose-${pose}`}
    >
      <div className="moodby-shadow" />
      <div className="moodby-sprout"><span /><span /></div>
      <div className="moodby-body">
        <div className="moodby-eye moodby-eye--left" />
        <div className="moodby-eye moodby-eye--right" />
        <div className="moodby-brow moodby-brow--left" />
        <div className="moodby-brow moodby-brow--right" />
        <div className="moodby-cheek moodby-cheek--left" />
        <div className="moodby-cheek moodby-cheek--right" />
        <div className="moodby-mouth" />
      </div>
      <div className="moodby-scarf" />
      {variant === "hero" && (
        <>
          <div className="moodby-arm moodby-arm--left" />
          <div className="moodby-arm moodby-arm--right" />
          <div className="moodby-mug">♥</div>
          <div className="moodby-book"><span /></div>
        </>
      )}
      {variant === "picnic" && <div className="picnic-props" />}
    </div>
  );
}
