import { GymTicketListResponse } from '@/types/gymTicket';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchGymTickets = async (): Promise<GymTicketListResponse> => {
  const token = localStorage.getItem('accessToken');

  const res = await fetch(`${API_BASE_URL}/gymTicket/member`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('이용권 조회에 실패했습니다.');

  const data: GymTicketListResponse = await res.json();

  return data;
};

// 일반 유저 티켓 생성
export const fetchPurchaseTicketApi = async (
  gymProductId: number,
): Promise<void> => {
  const url = `${API_BASE_URL}/gymTicket/purchase/${gymProductId}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {},
    credentials: 'include',
    body: '',
  });

  if (!res.ok) {
    throw new Error(`구매 요청 실패: ${res.status}`);
  }
};
