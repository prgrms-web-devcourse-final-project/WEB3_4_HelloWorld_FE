import { create } from 'zustand';

type UserStore = {
  user: any | null;
  setUser: (user: any) => void;
  clearUser: () => void;
  isLoggedIn: boolean;
  userType: 'member' | 'trainer' | 'owner' | null;
  setUserType: (userType: 'member' | 'trainer' | 'owner') => void;
};

export const useMemberStore = create<UserStore>((set) => ({
  user: null,
  isLoggedIn: false,
  userType: null,
  setUserType: (userType) => set({ userType }),
  setUser: (user) =>
    set({
      user,
    }),
  clearUser: () => set({ user: null }),
}));
