import { UserData } from '@/types/UserData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const registerUser = async (userData: UserData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/member/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(userData),
      credentials: 'include',
    });

    if (response.ok) {
      return await response.json();
    } else {
      const error = await response.json();

      throw new Error(error.message || '회원가입에 실패하였습니다.');
    }
  } catch (error) {
    console.error('회원가입 실패:', error);
    throw error;
  }
};
