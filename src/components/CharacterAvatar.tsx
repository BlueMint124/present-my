import type { CharacterState } from "../types";

export type CharacterAnimation = "breath" | "wave" | "smile" | "cry";

type CharacterAvatarProps = {
  animation?: CharacterAnimation;
  character: CharacterState;
  pose?: string;
  variant?: "default" | "hero" | "mini" | "phone" | "nav" | "picnic" | "profile";
};

export function CharacterAvatar({
  animation = "breath",
  character,
  pose = "front",
  variant = "default"
}: CharacterAvatarProps) {
  const showProps = variant === "hero" || variant === "picnic";

  return (
    <div
      aria-label={`${character.name} 캐릭터`}
      className={`moodby moodby--${variant} moodby--pose-${pose} moodby--${animation}`}
    >
      <div className="moodby-aura"><span /><span /><span /></div>
      <div className="moodby-shadow" />
      <div className="moodby-leg moodby-leg--left" />
      <div className="moodby-leg moodby-leg--right" />
      <div className="moodby-arm moodby-arm--left" />
      <div className="moodby-arm moodby-arm--right" />
      <div className="moodby-sprout"><span /><span /></div>
      <div className="moodby-body">
        <div className="moodby-texture" />
        <div className="moodby-eye moodby-eye--left" />
        <div className="moodby-eye moodby-eye--right" />
        <div className="moodby-brow moodby-brow--left" />
        <div className="moodby-brow moodby-brow--right" />
        <div className="moodby-tear moodby-tear--left" />
        <div className="moodby-tear moodby-tear--right" />
        <div className="moodby-cheek moodby-cheek--left" />
        <div className="moodby-cheek moodby-cheek--right" />
        <div className="moodby-mouth" />
      </div>
      <div className="moodby-scarf"><span /></div>
      {showProps && (
        <>
          <div className="moodby-mug">♥</div>
          <div className="moodby-book"><span /></div>
        </>
      )}
      {variant === "picnic" && <div className="picnic-props" />}
    </div>
  );
}
