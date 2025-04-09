export interface GymType {
  gymName: string;
  address: string;
  imageUrl: string;
}

export type GymListResponse = {
  content: GymType[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
  hasPrevious: boolean;
  isLast: boolean;
};
