import { useState } from 'react';

function load(): number[] {
	try {
		return JSON.parse(localStorage.getItem('favorites') ?? '[]');
	} catch {
		return [];
	}
}

export function useFavorites() {
	const [ids, setIds] = useState<number[]>(load);

	function toggle(id: number) {
		setIds((prev) => {
			const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
			localStorage.setItem('favorites', JSON.stringify(next));
			return next;
		});
	}

	return { ids, toggle, isFavorite: (id: number) => ids.includes(id) };
}
