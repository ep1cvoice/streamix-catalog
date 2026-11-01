import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { addToList, fetchList, isSameItem, removeFromList, type ListEntry, type ListName } from '../api/lists';
import type { ContentItem } from '../types/content';

export const LISTS_QUERY_KEY = ['lists'] as const;

export function useUserList(list: ListName) {
	const { status, user } = useAuthContext();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	// The user id in the key keeps one account's list from ever showing up for another
	const queryKey = [...LISTS_QUERY_KEY, user?.id, list];
	const mutationKey = [...LISTS_QUERY_KEY, list];

	const query = useQuery({
		queryKey,
		queryFn: () => fetchList(list),
		enabled: status === 'authenticated',
	});

	const mutation = useMutation({
		mutationKey,
		// One scope per list: toggles run one after another, so a fast add→remove can't reach the server reversed
		scope: { id: mutationKey.join(':') },
		mutationFn: async ({ item, add }: { item: ContentItem; add: boolean }) => {
			if (add) await addToList(list, item);
			else await removeFromList(list, item);
		},
		onMutate: async ({ item, add }) => {
			await queryClient.cancelQueries({ queryKey });
			const previous = queryClient.getQueryData<ListEntry[]>(queryKey);
			queryClient.setQueryData<ListEntry[]>(queryKey, (old = []) =>
				add ? [...old, { ...item, addedAt: new Date().toISOString() }] : old.filter((x) => !isSameItem(x, item)),
			);
			return { previous };
		},
		onError: (error, { item }, context) => {
			console.error(`Failed to update ${list} for "${item.title}":`, error);
			queryClient.setQueryData(queryKey, context?.previous);
		},
		onSettled: () => {
			// Refetch only after the last queued toggle; an earlier refetch could briefly undo newer optimistic state
			if (queryClient.isMutating({ mutationKey }) === 1) return queryClient.invalidateQueries({ queryKey });
		},
	});

	const items: ContentItem[] = query.data ?? [];
	const has = (item: ContentItem) => items.some((x) => isSameItem(x, item));

	function toggle(item: ContentItem) {
		if (status !== 'authenticated') {
			// Lists live in the account now: guests sign in first and come back to the same page
			navigate(`/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`);
			return;
		}
		mutation.mutate({ item, add: !has(item) });
	}

	return {
		items,
		has,
		toggle,
		isLoading: status === 'loading' || (status === 'authenticated' && query.isPending),
		error: query.error,
		refetch: query.refetch,
	};
}
