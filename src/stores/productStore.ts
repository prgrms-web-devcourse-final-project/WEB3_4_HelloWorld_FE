'use client';
import { create } from 'zustand';

import { PtDetailResponse } from '@/types/pt.types';

interface ProductState {
  productList: PtDetailResponse | null;
  nickname: string | null;
  profileImage: string | null;
  loginId: number | null;
  setProductList: (productList: PtDetailResponse) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  productList: null,
  nickname: null,
  profileImage: null,
  loginId: null,
  setProductList: (productList: PtDetailResponse) => set({ productList }),
}));
