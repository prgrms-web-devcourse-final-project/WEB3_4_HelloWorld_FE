import { GymListResponse } from '@/types/gym';
import { GymData, GymDetailResponse } from '@/types/gyms';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchGymList = async (): Promise<GymListResponse> => {
  const res = await fetch(`${API_BASE_URL}/gym/search`, {
    credentials: 'include',
  });

  if (!res.ok) throw new Error('헬스장 목록 조회 실패');

  const data: GymListResponse = await res.json();

  return data;
};

export const fetchGymListApi = async (
  page: number,
  pageSize: number,
  searchTerm?: string,
): Promise<GymData[]> => {
  const searchOption = searchTerm ? 'GYM' : 'NONE';
  const query = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    searchOption,
    searchTerm: searchTerm || '',
  });

  const url = `${API_BASE_URL}/gym?${query.toString()}`;

  try {
    const res = await fetch(url, { credentials: 'include' });

    if (!res.ok) throw new Error(`요청 실패: ${res.status}`);

    const json = await res.json();

    return json.content ?? [];
  } catch {
    return [];
  }
};
// 나의 헬스장 목록 조회
export const fetchGymListOwnerApi = async (
  page: number,
  pageSize: number,
  searchTerm?: string,
): Promise<GymData[]> => {
  const searchOption = searchTerm ? 'GYM' : 'NONE';
  const query = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    searchOption,
    searchTerm: searchTerm || '',
  });

  const url = `${API_BASE_URL}/gym/search/owner?${query.toString()}`;

  try {
    const res = await fetch(url, { credentials: 'include' });

    if (!res.ok) throw new Error(`요청 실패: ${res.status}`);

    const json = await res.json();

    return json.content ?? [];
  } catch {
    return [];
  }
};

export const fetchGymDetailApi = async (
  gymId: number,
): Promise<GymDetailResponse> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/gym/${gymId}`,
      {
        credentials: 'include',
      },
    );

    if (!res.ok) throw new Error('헬스장 상세 조회 실패');

    const data: GymDetailResponse = await res.json();

    return data;
  } catch (err) {
    console.error('[fetchGymDetailApi] 에러:', err);
    throw err;
  }
};

import { GymTrainer } from '@/types/gyms';

// 헬스장 강사 정보
export const fetchGymTrainersApi = async (
  gymId: number,
): Promise<GymTrainer[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/gym/${gymId}/trainer`,
    {
      credentials: 'include',
    },
  );

  if (!res.ok) throw new Error('헬스장 트레이너 정보 조회 실패');

  return res.json();
};

export const fetchGymFacilitiesApi = async (gymId: number) => {
  const res = await fetch(`${API_BASE_URL}/gym/${gymId}/facility`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error('헬스장 시설 정보 조회 실패');
  }

  return {
    ...data.facilityResponse,
    machineResponses: data.machineResponses,
  };
};

// 회원 전용 위치 검색
export const fetchNearbyGymsApi = async (
  searchTerm: string,
  page = 0,
  pageSize = 6,
): Promise<GymData[]> => {
  try {
    const token = localStorage.getItem('accessToken');

    const res = await fetch(
      `${API_BASE_URL}/gym/nearby?searchOption=gym&searchTerm=${encodeURIComponent(
        searchTerm,
      )}&page=${page}&pageSize=${pageSize}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: '*/*',
        },
        credentials: 'include',
      },
    );

    if (!res.ok) throw new Error('위치 기반 헬스장 검색 실패');

    const json = await res.json();

    return json.content || [];
  } catch (err) {
    console.error('fetchNearbyGymsApi error:', err);

    return [];
  }
};

export const myGymList = async () => {
  const res = await fetch(`${API_BASE_URL}/partnergym`, {
    credentials: 'include',
  });
  const data = await res.json();

  return data;
};
