import { useState } from 'react';
import type { ContentItem } from '../types/content';

function load(): ContentItem[] {
	try {
		const parsed = JSON.parse(localStorage.getItem('favorites') ?? '[]');
		return Array.isArray(parsed)
			? parsed.filter((x): x is ContentItem => typeof x === 'object' && x !== null && typeof x.id === 'number' && Array.isArray(x.genre))
			: [];
	} catch {
		return [];
	}
}

export function useFavorites() {
	const [items, setItems] = useState<ContentItem[]>(load);

	function toggle(item: ContentItem) {
		setItems((prev) => {
			const next = prev.some(x => x.id === item.id)
				? prev.filter(x => x.id !== item.id)
				: [...prev, item];
			localStorage.setItem('favorites', JSON.stringify(next));
			return next;
		});
	}

	return {
		items,
		ids: items.map(x => x.id),
		toggle,
		isFavorite: (id: number) => items.some(x => x.id === id),
	};
}
