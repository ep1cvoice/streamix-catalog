import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiError } from '../api/client';
import { useAuthContext } from '../context/AuthContext';

// Shared by the desktop user menu and the mobile drawer
export function useSignOut() {
	const { logout } = useAuthContext();
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);

	async function signOut() {
		setError(null);
		try {
			await logout(() => navigate('/'));
		} catch (err) {
			if (!(err instanceof ApiError)) console.error('Sign out failed:', err);
			setError(err instanceof ApiError ? err.message : 'Could not sign out. Try again.');
		}
	}

	return { signOut, error };
}
