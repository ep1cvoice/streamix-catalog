import type { ContentItem } from '../types/content';
import { apiRequest } from './client';

export type ListName = 'favorites' | 'watch-later';
export type ListEntry = ContentItem & { addedAt: string };

export function mediaTypeOf(item: ContentItem): 'movie' | 'tv' {
  return item.type === 'movie' ? 'movie' : 'tv';
}

// TMDB ids are only unique per media type: movie 1399 and series 1399 are different titles
export function isSameItem(a: ContentItem, b: ContentItem): boolean {
  return a.id === b.id && mediaTypeOf(a) === mediaTypeOf(b);
}

const itemPath = (list: ListName, item: ContentItem) => `/lists/${list}/${mediaTypeOf(item)}/${item.id}`;

// Featured heroes are bundled assets whose URLs change with every build, so only remote images are kept
function toSnapshot(item: ContentItem): ContentItem {
  return { ...item, hero: item.hero?.startsWith('https://') ? item.hero : undefined };
}

export const fetchList = (list: ListName) => apiRequest<ListEntry[]>(`/lists/${list}`);

export const addToList = (list: ListName, item: ContentItem) =>
  apiRequest<ListEntry>(itemPath(list, item), { method: 'PUT', body: toSnapshot(item) });

export const removeFromList = (list: ListName, item: ContentItem) =>
  apiRequest<void>(itemPath(list, item), { method: 'DELETE' });

export const importLists = (lists: Record<ListName, unknown[]>) =>
  apiRequest<{ imported: number; skipped: number }>('/lists/import', { method: 'POST', body: lists });
