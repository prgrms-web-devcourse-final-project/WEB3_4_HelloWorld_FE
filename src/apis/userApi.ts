// src/apis/userApi.ts

import { UserData } from '@/types/UserData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// ✅ 회원가입
export const registerUser = async (userData: UserData): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/member/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // ❗️ 로그인된 상태가 아니라면 토큰 생략 가능
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(userData),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();

      throw new Error(error.message || '회원가입에 실패하였습니다.');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

// ✅ 유저 정보 조회
export const getUserInfo = async (): Promise<UserData> => {
  const res = await fetch(`${API_BASE_URL}/member/me`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(`유저 정보 불러오기 실패: ${res.status}`);
  }

  return res.json();
};

// ✅ 유저 정보 수정
export const updateUserInfo = async (userData: UserData): Promise<void> => {
  const res = await fetch(`${API_BASE_URL}/member`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error(`유저 정보 수정 실패: ${res.status}`);
  }
};
