'use client';

import Image from 'next/image';
type SocialType = 'kakao' | 'naver' | 'google' | 'apple';

interface Props {
  type: SocialType;
  onClick?: () => void;
}

const SocialLoginButton = ({ type, onClick }: Props) => {
  const styles = {
    kakao: 'bg-[#FEE500] text-[#000]',
    naver: 'bg-[#03C75A] text-[#fff]',
    google: 'bg-[#fff] text-[#000] border border-[#000]',
    apple: 'bg-[#000] text-[#fff]',
  };

  const labelMap = {
    kakao: '카카오 로그인',
    naver: '네이버 로그인',
    google: '구글 로그인',
    apple: '애플 로그인',
  };

  return (
    <button
      aria-label={labelMap[type]}
      className={`relative w-[443px] h-[55px] rounded-[8px] font-semibold text-xl ${styles[type]}`}
      type="button"
      onClick={onClick}
    >
      <Image
        alt={`${labelMap[type]} 아이콘`}
        className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6"
        height={24}
        role="presentation"
        src={`/assets/icons/${type}.svg`}
        width={24}
      />
      <span className="w-full flex justify-center items-center">
        {labelMap[type]}
      </span>
    </button>
  );
};

export default SocialLoginButton;
