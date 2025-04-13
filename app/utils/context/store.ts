import { create } from 'zustand';
import axios from 'axios';

interface User {
    id: number;
    username: string;
    quiz_answers: object;
}

interface UserState {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user: User) => set({ user }),
    clearUser: () => set({ user: null }),
}));

const fetchUser = async (): Promise<User> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
        const response = await axios.get(`${apiUrl}auth/me`, {
            method: 'GET',
            withCredentials: true,
        });

        return response.data; // Return the user data
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

export { useUserStore, fetchUser };