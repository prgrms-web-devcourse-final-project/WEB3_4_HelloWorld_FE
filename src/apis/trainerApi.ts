// 수정 예정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 트레이너 등록 (직원)
export const registerTrainer = async (trainerData: {
  trainerName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  bank: string;
  account: string;
  gymName: string;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/trainer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(trainerData),
      credentials: 'include',
    });

    if (response.ok) {
      return await response.json();
    } else {
      const error = await response.json();

      throw new Error(error.message || '트레이너 등록에 실패하였습니다.');
    }
  } catch (error) {
    console.error('트레이너 등록 실패:', error);
    throw error;
  }
};

// 사장님 등록 (Owner)
export const registerOwner = async (ownerData: {
  trainerName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  bank: string;
  account: string;
  businessNumber: string;
  date: string;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/trainer/owner`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(ownerData),
      credentials: 'include',
    });

    if (response.ok) {
      return await response.json();
    } else {
      const error = await response.json();

      throw new Error(error.message || '사장님 등록에 실패하였습니다.');
    }
  } catch (error) {
    console.error('사장님 등록 실패:', error);
    throw error;
  }
};
