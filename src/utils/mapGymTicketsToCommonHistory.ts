import { GymTicket } from '@/types/gymTicket';

export interface CommonHistory {
  id: string;
  status: '구매' | '만료';
  time: string;
  content: string;
  seller: string;
  price: number;
  period: string;
  gymName: string;
}

export const mapGymTicketsToCommonHistory = (
  tickets: GymTicket[],
): CommonHistory[] =>
  tickets.map((ticket) => ({
    id: ticket.gymTicketId.toString(),
    status: ticket.status === 'ACTIVE' ? '구매' : '만료',
    time: `${ticket.startDate} ~ ${ticket.endDate}`,
    content: ticket.gymProductName,
    seller: ticket.gymName ?? 'GymMate',
    price: ticket.gymProductFee,
    period: `${ticket.startDate} ~ ${ticket.endDate}`,
    gymName: ticket.gymName ?? 'GymMate',
  }));
