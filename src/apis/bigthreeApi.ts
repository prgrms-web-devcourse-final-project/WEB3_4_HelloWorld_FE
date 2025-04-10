const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchBigThreeStatusApi = async () => {
  const token = localStorage.getItem('accessToken');

  const res = await fetch(`${API_BASE_URL}/bigthree/status`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token ?? ''}`,
    },
    credentials: 'include',
  });

  if (!res.ok) {
    const error = await res.json();

    throw new Error(error.message || '3대 통계 조회 실패');
  }

  return res.json();
};

// 기록 갱신 타입
interface BigThreeRequestBody {
  date?: string;
  bigthreeRequest: {
    bench: number;
    deadlift: number;
    squat: number;
  };
}

export const postBigThreeApi = async (body: BigThreeRequestBody) => {
  const token = localStorage.getItem('accessToken');

  const res = await fetch(`${API_BASE_URL}/bigthree`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token ?? ''}`,
    },
    credentials: 'include',
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.json();

    throw new Error(error.message || '3대 기록 갱신 실패');
  }

  return res.json();
};
