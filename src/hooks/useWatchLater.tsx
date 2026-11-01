import { useUserList } from './useUserList';

export function useWatchLater() {
	const { has, ...list } = useUserList('watch-later');
	return { ...list, isWatchLater: has };
}
