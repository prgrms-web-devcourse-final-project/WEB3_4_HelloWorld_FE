'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@/stores/memberTypeStore';
import { checkMember, checkTrainer } from '@/apis/userTypeApi';

const FetchAuthOnMain = () => {
  const { setAuth, resetAuth, isInitialized, isLoggedIn } = useAuthStore();

  useEffect(() => {
    //  상태 복구가 완료되고 이미 로그인된 상태라면 fetch 생략
    if (isInitialized && isLoggedIn) return;

    const fetchUser = async () => {
      try {
        const memberRes = await checkMember();

        if (memberRes?.ok) {
          console.log('memberRes', memberRes);
          setAuth({
            isLoggedIn: true,
            userType: 'member',
            isOwner: null,
          });

          return;
        }

        const trainerRes = await checkTrainer();

        if (trainerRes?.ok) {
          console.log('trainerRes', trainerRes);
          const { userType, isOwner } = await trainerRes.json();

          setAuth({
            isLoggedIn: true,
            userType: userType.toLowerCase() as 'trainer',
            isOwner,
          });

          return;
        }

        resetAuth();
      } catch {
        resetAuth();
      }
    };

    fetchUser();
  }, [setAuth, resetAuth, isInitialized, isLoggedIn]);

  return null;
};

export default FetchAuthOnMain;
