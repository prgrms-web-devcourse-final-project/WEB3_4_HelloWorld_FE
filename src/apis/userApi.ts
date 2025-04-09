import { UserData } from '@/types/UserData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

//  회원가입
export const registerUser = async (userData: UserData): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/member`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

//  유저 정보 조회
export const getUserInfo = async (): Promise<UserData> => {
  const res = await fetch(`${API_BASE_URL}/member`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(`유저 정보 불러오기 실패: ${res.status}`);
  }

  return res.json();
};

//  유저 정보 수정
export const updateUserInfo = async (
  userData: UserData,
  imageFile?: File,
): Promise<void> => {
  const formData = new FormData();

  formData.append(
    'memberData',
    new Blob([JSON.stringify(userData)], { type: 'application/json' }),
  );

  if (imageFile) {
    formData.append('image', imageFile);
  }

  const res = await fetch(`${API_BASE_URL}/member`, {
    method: 'PUT',
    body: formData,
    credentials: 'include',
    headers: {
      // ❌ Content-Type은 FormData에서 자동 설정됨 → 절대 직접 지정 X
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });

  if (!res.ok) {
    throw new Error('회원 정보 수정 실패');
  }
};

// 계정 탈퇴
export const deleteUserAccount = async (): Promise<void> => {
  const token = localStorage.getItem('accessToken');

  const res = await fetch(`${API_BASE_URL}/member`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token ?? ''}`,
    },
    credentials: 'include',
  });

  if (!res.ok) {
    const error = await res.json();

    throw new Error(error.message || '회원 탈퇴에 실패했습니다.');
  }
};

// 로그아웃
export const logoutUser = async (): Promise<void> => {
  const token = localStorage.getItem('accessToken');

  const res = await fetch(`${API_BASE_URL}/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token ?? ''}`,
    },
    credentials: 'include',
  });

  if (!res.ok) {
    const error = await res.json();

    throw new Error(error.message || '로그아웃에 실패했습니다.');
  }
};
