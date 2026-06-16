import moodbySprite from "../assets/moodby-sprite-sheet-clean.png";
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
  return (
    <div
      aria-label={`${character.name} 캐릭터`}
      className={`moodby moodby--${variant} moodby--pose-${pose} moodby--${animation}`}
    >
      <span className="moodby-glow" aria-hidden="true" />
      <span
        aria-hidden="true"
        className={`moodby-sprite moodby-sprite--${animation}`}
        style={{ backgroundImage: `url(${moodbySprite})` }}
      />
    </div>
  );
}
