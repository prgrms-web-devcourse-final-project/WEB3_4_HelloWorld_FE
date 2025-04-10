'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import fetcher from '@/utils/apiInstance';
import { useAuthStore } from '@/stores/memberTypeStore';

const fetchMemberData = async (roles: 'member' | 'trainer' | null) => {
  const res = await fetcher(`/${roles}`, {
    method: 'GET',
  });

  return res;
};

export const useInitUser = () => {
  const { isLoggedIn, userType, user, setUser } = useAuthStore();

  const { data, isSuccess } = useQuery({
    queryKey: ['userType'],
    queryFn: () => fetchMemberData(userType),
    retry: false,
    staleTime: Infinity,
    enabled: isLoggedIn && userType !== null && user === null,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
    }
  }, [isSuccess, data]);
};
