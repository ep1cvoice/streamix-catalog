import { useUserList } from './useUserList';

export function useFavorites() {
	const { has, ...list } = useUserList('favorites');
	return { ...list, isFavorite: has };
}
