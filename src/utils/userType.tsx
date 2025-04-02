'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@/stores/memberTypeStore';
import { checkMember, checkTrainer } from '@/apis/userTypeApi';

const FetchAuthOnMain = () => {
  const { setAuth, resetAuth } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // 1. 멤버 확인 요청
        const memberRes = await checkMember();

        if (memberRes?.ok) {
          setAuth({
            isLoggedIn: true,
            userType: 'member',
            isOwner: null,
          });

          return;
        }

        // 2. 트레이너 확인 요청
        const trainerRes = await checkTrainer();

        if (trainerRes?.ok) {
          const { userType, isOwner } = await trainerRes.json();

          setAuth({
            isLoggedIn: true,
            userType: userType.toLowerCase() as 'trainer',
            isOwner,
          });

          return;
        }

        resetAuth();
      } catch (err) {
        console.error('유저 인증 확인 실패:', err);
        resetAuth();
      }
    };

    fetchUser();
  }, [setAuth, resetAuth]);

  return null;
};

export default FetchAuthOnMain;
