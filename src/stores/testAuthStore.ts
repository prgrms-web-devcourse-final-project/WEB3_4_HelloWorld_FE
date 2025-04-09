import { create } from 'zustand';

type UserStore = {
  user: any | null;
  setUser: (user) => void;
  clearUser: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  userType: 'member' | 'trainer' | 'owner' | null;
  setUserType: (userType: 'member' | 'trainer' | 'owner') => void;
};

export const useMemberStore = create<UserStore>((set) => ({
  user: null,
  isLoggedIn: false,
  userType: null,
  setUserType: (userType) => set({ userType }),
  setIsLoggedIn: (isLoggedIn) => {
    sessionStorage.setItem('isLoggedIn', isLoggedIn.toString());
    set(() => ({ isLoggedIn }));
  },
  setUser: (user) =>
    set({
      user,
    }),
  clearUser: () => {
    sessionStorage.removeItem('isLoggedIn');
    set({ user: null, isLoggedIn: false, userType: null });
  },
}));
