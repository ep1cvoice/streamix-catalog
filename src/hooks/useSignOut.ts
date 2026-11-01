import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { ApiError } from '../api/client';
import { useAuthContext } from '../context/AuthContext';
import { LISTS_QUERY_KEY } from './useUserList';

// Shared by the desktop user menu and the mobile drawer
export function useSignOut() {
	const { logout } = useAuthContext();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [error, setError] = useState<string | null>(null);

	async function signOut() {
		setError(null);
		try {
			await logout(() => navigate('/'));
			// Don't keep the previous account's lists in memory on a shared device
			queryClient.removeQueries({ queryKey: LISTS_QUERY_KEY });
		} catch (err) {
			if (!(err instanceof ApiError)) console.error('Sign out failed:', err);
			setError(err instanceof ApiError ? err.message : 'Could not sign out. Try again.');
		}
	}

	return { signOut, error };
}
