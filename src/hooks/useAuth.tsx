import { startTransition, useEffect, useState } from 'react';
import { ApiError } from '../api/client';
import * as authApi from '../api/auth';
import type { User } from '../api/auth';

type AuthState =
	| { status: 'loading'; user: null }
	| { status: 'guest'; user: null }
	| { status: 'authenticated'; user: User };

export function useAuth() {
	const [state, setState] = useState<AuthState>({ status: 'loading', user: null });

	// The session lives in an httpOnly cookie, so the only way to know who is logged in is to ask
	useEffect(() => {
		let cancelled = false;
		authApi
			.fetchMe()
			.then((user) => {
				if (!cancelled) setState({ status: 'authenticated', user });
			})
			.catch((error: unknown) => {
				if (cancelled) return;
				// 401 just means "not logged in"; anything else is worth seeing
				if (!(error instanceof ApiError && error.status === 401)) console.error('Failed to restore session:', error);
				setState({ status: 'guest', user: null });
			});
		return () => {
			cancelled = true;
		};
	}, []);

	async function login(email: string, password: string) {
		const user = await authApi.login(email, password);
		setState({ status: 'authenticated', user });
	}

	async function register(email: string, password: string) {
		const user = await authApi.register(email, password);
		setState({ status: 'authenticated', user });
	}

	// afterSignOut runs in the same transition as the state change. React Router navigates inside a
	// transition, so a navigation passed here lands in the same render as "guest" and a protected page
	// never sees "guest" while it is still the current route.
	async function logout(afterSignOut?: () => void) {
		await authApi.logout();
		startTransition(() => {
			setState({ status: 'guest', user: null });
			afterSignOut?.();
		});
	}

	return { ...state, login, register, logout };
}
