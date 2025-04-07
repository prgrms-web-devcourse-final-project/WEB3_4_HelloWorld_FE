'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@/stores/memberTypeStore';
import { checkMember, checkTrainer } from '@/apis/userTypeApi';

const FetchAuthOnMain = () => {
  const { setAuth, resetAuth } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const memberRes = await checkMember();

        if (memberRes?.ok) {
          setAuth({
            isLoggedIn: true,
            userType: 'member',
            isOwner: null,
          });

          return;
        }

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
      } catch {
        resetAuth();
      }
    };

    fetchUser();
  }, [setAuth, resetAuth]);

  return null;
};

export default FetchAuthOnMain;
