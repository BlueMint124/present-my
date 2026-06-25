import type { DiaryEntry } from "../types";
import type { ShopItem } from "../data/shopItems";
import { supabase } from "./supabaseClient";

type DiaryEntryRow = {
  content: string;
  created_at: string;
  id: string;
  mood: string;
  prompt: string;
  tags: string[];
};

type ShopItemRow = {
  category: ShopItem["category"];
  description: string;
  id: string;
  name: string;
  price: number;
  purchasable: boolean;
  sheet_position: string;
  tag: string;
};

export async function fetchDiaryEntries(profileId?: string): Promise<DiaryEntry[]> {
  if (!supabase) {
    return [];
  }

  let query = supabase
    .from("diary_entries")
    .select("id, created_at, mood, prompt, content, tags")
    .order("created_at", { ascending: true });

  if (profileId) {
    query = query.eq("profile_id", profileId);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapDiaryEntryRow);
}

export async function insertDiaryEntry(entry: DiaryEntry, profileId?: string): Promise<DiaryEntry> {
  if (!supabase) {
    return entry;
  }

  const { data, error } = await supabase
    .from("diary_entries")
    .insert({
      content: entry.content,
      created_at: entry.createdAt,
      id: entry.id,
      is_private: true,
      mood: entry.mood,
      profile_id: profileId ?? null,
      prompt: entry.prompt,
      tags: entry.tags
    })
    .select("id, created_at, mood, prompt, content, tags")
    .single();

  if (error) {
    throw error;
  }

  return mapDiaryEntryRow(data);
}

export async function fetchShopItems(): Promise<ShopItem[]> {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("shop_items")
    .select("id, name, category, description, price, tag, sheet_position, purchasable")
    .order("price", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapShopItemRow);
}

function mapDiaryEntryRow(row: DiaryEntryRow): DiaryEntry {
  return {
    content: row.content,
    createdAt: row.created_at,
    id: row.id,
    mood: row.mood,
    prompt: row.prompt,
    tags: row.tags
  };
}

function mapShopItemRow(row: ShopItemRow): ShopItem {
  return {
    category: row.category,
    description: row.description,
    id: row.id,
    name: row.name,
    price: row.price,
    purchasable: row.purchasable,
    sheetPosition: row.sheet_position,
    tag: row.tag
  };
}
