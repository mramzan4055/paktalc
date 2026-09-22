import manifest from "../../images.json";

export type Variant = {
  width: number;
  height: number;
  webp: string[];
  avif: string[];
  png?: string;
};

export type Slot = {
  page: string;
  section: string;
  asset_id: string;
  alt: string;
  caption: string;
  title: string;
  fetchpriority: string | null;
  loading: string;
  reuses_slot: string | null;
  variants: Record<string, Variant>;
};

type Og = { file: string; w: number; h: number; asset: string; alt: string };

const images = manifest.images as unknown as Record<string, Slot>;
const og = manifest.og as unknown as Record<string, Og>;

/** Returns a slot, following `reuses_slot` when the slot carries no variants of its own. */
export function getSlot(id: string): Slot {
  const slot = images[id];
  if (!slot) throw new Error(`images.json: unknown slot "${id}"`);
  if (Object.keys(slot.variants ?? {}).length === 0 && slot.reuses_slot) {
    return { ...getSlot(slot.reuses_slot), alt: slot.alt, caption: slot.caption };
  }
  return slot;
}

/** Variant preference: explicit name, else the first listed. */
export function getVariant(slot: Slot, name?: string): { name: string; v: Variant } {
  if (name && slot.variants[name]) return { name, v: slot.variants[name] };
  const [first] = Object.entries(slot.variants);
  return { name: first[0], v: first[1] };
}

export const srcsetOf = (list: string[]) => list.join(", ");

/** Largest file of a srcset list ("url 1920w" → url). */
export const largest = (list: string[]) => list[list.length - 1]?.split(" ")[0] ?? "";

export function slotsForPage(page: string) {
  return Object.entries(images)
    .filter(([, s]) => s.page === page)
    .map(([id]) => id);
}

export function getOg(key: string) {
  return og[key];
}

/** Absolute-path URL for an image usable as og:image when there is no prepared OG asset. */
export function ogFallbackFromSlot(slotId: string) {
  const slot = getSlot(slotId);
  const { v } = getVariant(slot);
  return { url: largest(v.webp), width: v.width, height: v.height, alt: slot.alt };
}
