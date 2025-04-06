const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

import { DiaryRequestBody } from '@/types/diary';

interface DiaryParams {
  page: number;
  size: number;
}

interface DiaryItem {
  recordId: number;
  date: string;
  title: string;
  content: string;
}

interface DiaryResponse {
  content: DiaryItem[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  isLast: boolean;
}

export interface Schedule {
  id: number;
  date: string;
  title: string;
  description: string;
  tag: string;
}

//  운동 기록 목록 조회
export const fetchDiaryListApi = async ({
  page,
  size,
}: DiaryParams): Promise<Schedule[]> => {
  const query = new URLSearchParams({ page: String(page), size: String(size) });
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_BASE_URL}/diary?${query.toString()}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('일정 데이터를 불러오지 못했습니다.');
  }

  const json: DiaryResponse = await res.json();

  return json.content.map((item) => ({
    id: item.recordId,
    date: item.date,
    title: item.title,
    description: item.content,
    tag: '오운했',
  }));
};

//  운동 기록 등록
export const postDiaryApi = async (body: DiaryRequestBody) => {
  const token = localStorage.getItem('accessToken');

  const res = await fetch(`${API_BASE_URL}/diary`, {
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

    throw new Error(error.message || '운동 기록 등록 실패');
  }

  return res.json();
};

//  운동 기록 삭제
export const deleteDiaryApi = async (diaryId: number) => {
  const token = localStorage.getItem('accessToken');

  const res = await fetch(`${API_BASE_URL}/diary/${diaryId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token ?? ''}`,
    },
    credentials: 'include',
  });

  if (!res.ok) {
    const error = await res.json();

    throw new Error(error.message || '운동 기록 삭제 실패');
  }

  return res;
};
