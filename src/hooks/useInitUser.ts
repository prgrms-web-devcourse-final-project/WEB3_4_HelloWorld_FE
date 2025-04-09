'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

import fetcher from '@/utils/apiInstance';
import { checkMember, checkTrainer } from '@/apis/userTypeApi';
import { useMemberStore } from '@/stores/testAuthStore';

const fetchMemberData = async (roles: 'member' | 'trainer') => {
  const res = await fetcher(`/${roles}`, {
    method: 'GET',
  });

  return res;
};

export const useInitUser = () => {
  const { user, setUser, setUserType } = useMemberStore();
  const [roles, setRoles] = useState<'member' | 'trainer' | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false;

    return !!localStorage.getItem('auth');
  });

  useEffect(() => {
    const checkUserType = async () => {
      if (!isAuthenticated) return;
      if (user) return;
      const memberRes = await checkMember();

      if (memberRes.ok) {
        setRoles('member');

        return;
      }

      const trainerRes = await checkTrainer();

      if (trainerRes.ok) {
        setRoles('trainer');
      }
    };

    checkUserType();
  }, [isAuthenticated]);

  const { data, isSuccess } = useQuery({
    queryKey: ['userType'],
    queryFn: () => fetchMemberData(roles as 'member' | 'trainer'),
    retry: false,
    staleTime: Infinity,
    enabled: isAuthenticated && roles !== null && user === null,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
      //   if (roles === 'trainer' && data.isOwner === true) {
      //     setUserType('owner');
      //   } else if (roles) {
      //     setUserType(roles);
      //   }
    }
  }, [isSuccess, data]);

  return { data, isSuccess, roles, isAuthenticated };
};
