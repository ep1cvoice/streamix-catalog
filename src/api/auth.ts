import { apiRequest } from './client';

export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export const fetchMe = () => apiRequest<User>('/auth/me');

export const login = (email: string, password: string) =>
  apiRequest<User>('/auth/login', { method: 'POST', body: { email, password } });

export const register = (email: string, password: string) =>
  apiRequest<User>('/auth/register', { method: 'POST', body: { email, password } });

export const logout = () => apiRequest<void>('/auth/logout', { method: 'POST' });
