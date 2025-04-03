export interface PaymentHistory {
  id: string;
  status: '충전' | '충전 취소' | '구매' | '구매 취소';
  time: string;
  content: string;
  seller: string;
  price: number;
  period?: string;
}

export const PAYMENT_HISTORY_MOCK: PaymentHistory[] = [
  {
    id: '1',
    status: '충전',
    time: '2025.04.01 충전',
    content: '포인트 충전',
    seller: 'GymMate',
    price: 100000,
    period: '2025.04.01 충전',
  },
  {
    id: '2',
    status: '구매',
    time: '2025.04.01',
    content: '30일 프리패스',
    seller: '홍길동 트레이너',
    price: -40000,
    period: '2025.04.01 ~ 2025.04.30',
  },
  {
    id: '3',
    status: '구매 취소',
    time: '2025.03.28',
    content: '1회 이용권',
    seller: 'GymMate',
    price: 10000,
    period: '2025.03.28 구매 취소',
  },
  {
    id: '4',
    status: '구매',
    time: '2025.03.28',
    content: '오프라인 프리패스 이용권',
    seller: '홍길동 트레이너',
    price: 1000000,
    period: '2025.03.28 ~ 2025.04.27',
  },
];
