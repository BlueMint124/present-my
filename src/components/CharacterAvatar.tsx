import moodbySprite from "../assets/moodby-sprite-sheet-clean.png";
import shopItemSheet from "../assets/shop-equipment-sheet.png";
import type { ShopItem } from "../data/shopItems";
import type { CharacterState } from "../types";

export type CharacterAnimation = "breath" | "wave" | "smile" | "cry";

type CharacterAvatarProps = {
  animation?: CharacterAnimation;
  character: CharacterState;
  equippedShopItem?: ShopItem;
  pose?: string;
  variant?: "default" | "hero" | "mini" | "phone" | "nav" | "picnic" | "profile";
};

export function CharacterAvatar({
  animation = "breath",
  character,
  equippedShopItem,
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
      {equippedShopItem && (
        <span
          aria-label={`착용 아이템 ${equippedShopItem.name}`}
          className={`character-equipped-item character-equipped-item--${equippedShopItem.id}`}
          style={{ backgroundImage: `url(${shopItemSheet})`, backgroundPosition: equippedShopItem.sheetPosition }}
        />
      )}
    </div>
  );
}
