import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { JwtPayload } from '../types/auth';

interface AuthState {
    accessToken: string | null;
    username: string | null;
    setToken: (token: string) => void;
    logout: () => void;
}

function decodeUsername(token: string): string | null {
    try {
        const payload: JwtPayload = JSON.parse(atob(token.split('.')[1]));
        return payload.username;
    } catch {
        return null;
    }
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            username: null,
            setToken: (token) => set({ accessToken: token, username: decodeUsername(token) }),
            logout: () => set({ accessToken: null, username: null }),
        }),
        { name: 'soc-auth' },
    ),
);