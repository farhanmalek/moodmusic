import { create } from 'zustand';
import axios from 'axios';

export interface User {
    id: number;
    username: string;
    quiz_answers: object;
    spotifyImageUrl: string;
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
            withCredentials: true,
        });
   

        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

export { useUserStore, fetchUser };