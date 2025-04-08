export interface GymTicket {
  gymTicketId: number;
  gymProductName: string;
  startDate: string;
  endDate: string;
  gymProductFee: number;
  status: 'ACTIVE' | 'EXPIRED';
  partnerGymId?: number;
  gymName?: string;
}

export interface GymTicketListResponse {
  content: GymTicket[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
  hasPrevious: boolean;
  isLast: boolean;
}
