// 수강 테이블 타입 정의
export interface LessonHistory {
  id: string;
  status: '결제 성공' | '결제 취소' | '결제 환불';
  time: string;
  content: string;
  seller: string;
  price: number;
}
