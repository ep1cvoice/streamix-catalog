import type { ContentItem } from '../types/content';

export function groupByGenre(
  items: ContentItem[],
  minCount = 4
): Array<{ genre: string; items: ContentItem[] }> {
  const map = new Map<string, ContentItem[]>();

  for (const item of items) {
    const primary = item.genre[0];
    if (!primary) continue;
    if (!map.has(primary)) map.set(primary, []);
    map.get(primary)!.push(item);
  }

  return Array.from(map.entries())
    .filter(([, list]) => list.length >= minCount)
    .sort((a, b) => b[1].length - a[1].length)
    .map(([genre, list]) => ({ genre, items: list }));
}
