import type { PublicProfileItem } from "../types";

export function getApprovedProfileItems(items: PublicProfileItem[]) {
  return items.filter((item) => item.approved);
}

export function containsPrivateDiaryItem(items: PublicProfileItem[]) {
  return items.some((item) => item.id === "private" && item.approved);
}
