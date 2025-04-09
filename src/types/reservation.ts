export interface ReservationResponse {
  content: ReservationItem[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface ReservationItem {
  reservationId: number;
  productName: string;
  date: string;
  time: number;
  price: number;
  cancelDate: string | null;
  completedDate: string | null;
  trainerId: number;
}
