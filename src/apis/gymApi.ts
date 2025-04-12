import { GymListResponse, GymDetailResponse } from '@/types/gym';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface FetchGymListParams {
  sortOption?: 'score' | 'nearby';
  searchOption?: 'none' | 'trainer' | 'district';
  searchTerm?: string;
  page?: number;
  pageSize?: number;
  x?: string;
  y?: string;
  isPartner?: boolean;
}

export const fetchGymList = async (
  params: FetchGymListParams,
): Promise<GymListResponse> => {
  const queryParams = new URLSearchParams();

  if (params.sortOption) queryParams.append('sortOption', params.sortOption);
  if (params.searchOption)
    queryParams.append('searchOption', params.searchOption);
  if (params.searchTerm) queryParams.append('searchTerm', params.searchTerm);
  if (params.page !== undefined)
    queryParams.append('page', String(params.page));
  if (params.pageSize !== undefined)
    queryParams.append('pageSize', String(params.pageSize));
  if (params.x) queryParams.append('x', params.x);
  if (params.y) queryParams.append('y', params.y);
  if (params.isPartner !== undefined)
    queryParams.append('isPartner', String(params.isPartner));

  const res = await fetch(`${API_BASE_URL}/gym?${queryParams.toString()}`);

  if (!res.ok) throw new Error('헬스장 목록 조회 실패');

  const data: GymListResponse = await res.json();

  return data;
};

// 상세 정보 조회 추가
export const fetchGymDetail = async (
  gymId: number,
): Promise<GymDetailResponse> => {
  const res = await fetch(`${API_BASE_URL}/gym/${gymId}`);

  if (!res.ok) {
    throw new Error(`헬스장 상세 조회 실패 (gymId: ${gymId})`);
  }

  const data: GymDetailResponse = await res.json();

  return data;
};

// 트레이너 정보
export const fetchGymTrainers = async (gymId: number) => {
  const res = await fetch(`${API_BASE_URL}/gym/${gymId}/trainer`);

  if (!res.ok) throw new Error('트레이너 정보 조회 실패');

  return await res.json();
};

// 편의시설 정보
export const fetchGymFacilities = async (gymId: number) => {
  const res = await fetch(`${API_BASE_URL}/gym/${gymId}/facility`);

  if (!res.ok) throw new Error('편의시설 조회 실패');

  return await res.json();
};
