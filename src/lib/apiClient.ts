import axios from 'axios';
import { useAuthStore } from '../store/authStore';

export const apiClient = axios.create({
    baseURL: 'https://soc-api.pancadev.com',
});

apiClient.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// If a request comes back 401, the token is invalid/expired — log out
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().logout();
        }
        return Promise.reject(error);
    },
);