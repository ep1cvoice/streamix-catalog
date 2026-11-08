import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { importLists, type ListName } from '../api/lists';
import { LISTS_QUERY_KEY } from './useUserList';

// Where the lists lived before accounts existed
const LEGACY_KEYS: Record<ListName, string> = { favorites: 'favorites', 'watch-later': 'watchLater' };
// Server-side cap per list; anything above it would fail the whole import
const IMPORT_LIMIT = 500;

function readLegacyList(key: string): unknown[] {
	const raw = localStorage.getItem(key);
	if (!raw) return [];
	try {
		const parsed: unknown = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed.slice(0, IMPORT_LIMIT) : [];
	} catch (error) {
		console.error(`Ignoring unreadable localStorage "${key}":`, error);
		return [];
	}
}

function clearLegacyLists(): void {
	for (const key of Object.values(LEGACY_KEYS)) localStorage.removeItem(key);
}

// One-time move of the old localStorage lists into the account on first sign-in.
// The server skips malformed entries and never overwrites what is already stored.
export function useLegacyListsImport(): void {
	const { status } = useAuthContext();
	const queryClient = useQueryClient();
	const inFlight = useRef(false);

	useEffect(() => {
		if (status !== 'authenticated' || inFlight.current) return;

		const lists = {
			favorites: readLegacyList(LEGACY_KEYS.favorites),
			'watch-later': readLegacyList(LEGACY_KEYS['watch-later']),
		};
		if (lists.favorites.length === 0 && lists['watch-later'].length === 0) {
			clearLegacyLists();
			return;
		}

		inFlight.current = true;
		importLists(lists)
			.then(() => {
				clearLegacyLists();
				return queryClient.invalidateQueries({ queryKey: LISTS_QUERY_KEY });
			})
			.catch((error: unknown) => {
				// The keys stay, so the next sign-in tries again
				console.error('Failed to import saved lists:', error);
			})
			.finally(() => {
				inFlight.current = false;
			});
	}, [status, queryClient]);
}
