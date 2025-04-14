export interface GymType {
  gymName: string;
  address: string;
  imageUrl?: string;
  gymId?: number;
  startTime?: string;
  endTime: string;
  avgScore?: number;
  isPartner?: boolean;
  thumbnailImage?: string | null;
  xField: number;
  yField: number;
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
