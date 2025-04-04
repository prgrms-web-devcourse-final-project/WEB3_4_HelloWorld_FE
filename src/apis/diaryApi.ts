const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
