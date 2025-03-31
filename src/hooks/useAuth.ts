'use client';

import { useState, useEffect } from 'react';
import API_BASE_URL from '@/utils/apiConfig';

const socialLoginForKaKaoUrl = `${API_BASE_URL}/oauth2/authorization/kakao`;
const redirectUrlAfterSocialLogin = 'http://localhost:3000';
const socialLogoutUrl = `${API_BASE_URL}/logout`;

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loginId, setId] = useState<number | null>(null);
  const [userType, setUserType] = useState<'TRAINER' | 'MEMBER'>('MEMBER');

  useEffect(() => {
    fetch(`${API_BASE_URL}/user/info`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Not logged in');
      })
      .then((data) => {
        setIsLoggedIn(true);
        setId(data.userid);
        setNickname(data.nickname);
        setProfileImage(data.profileImage);

        const fetchedUserType = data.properties?.userType;
        if (fetchedUserType === 'TRAINER' || fetchedUserType === 'MEMBER') {
          setUserType(fetchedUserType);
        } else {
          setUserType('MEMBER');
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
        setId(null);
        setNickname(null);
        setProfileImage(null);
        setUserType('MEMBER');
      });
  }, []);

  // role에 따라 URL에 쿼리 파라미터 추가
  const handleLogin = (role: 'MEMBER' | 'TRAINER'): void => {
    const currentUrl = window.location.href;
    localStorage.setItem('lastVisitedPage', currentUrl);
    const loginUrl = `${socialLoginForKaKaoUrl}?role=${role}`;
    window.location.href = loginUrl;
  };

  return { isLoggedIn, nickname, profileImage, loginId, userType, handleLogin };
};
