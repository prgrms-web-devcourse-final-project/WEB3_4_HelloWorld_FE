// 기본 카드용
export interface GymType {
  gymId: number;
  gymName: string;
  startTime: string;
  endTime: string;
  address: string;
  xField: string;
  yField: string;
  avgScore: number;
  isPartner: boolean;
  thumbnailImage: string;
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

// 상세 페이지용
export interface GymDetailResponse {
  gymId: number;
  gymName: string;
  startTime: string;
  endTime: string;
  phoneNumber: string;
  address: string;
  xField: string;
  yField: string;
  avgScore: number;
  intro: string;
  isPartner: boolean;
  gymImages: string[];
  gymProductResponses: GymProduct[];
}

export interface GymProduct {
  gymProductId: number;
  gymProductMonth: number;
  gymProductFee: number;
}
