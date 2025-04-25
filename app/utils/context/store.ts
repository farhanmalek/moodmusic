import { create } from 'zustand';
import axios from 'axios';
import { persist } from 'zustand/middleware';

export interface User {
    id: string;
    username: string;
    quiz_answers: object;
    spotifyImageUrl: string;
}

interface UserState {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
}
const useUserStore = create<UserState>()(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null }),
      }),
      {
        name: 'user-storage'
      }
    ),
  );

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