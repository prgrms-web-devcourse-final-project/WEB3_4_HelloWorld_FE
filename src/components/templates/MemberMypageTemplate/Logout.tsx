'use client';

import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

const Logout = () => {
  const router = useRouter();

  const handleWithdraw = () => {
    alert('회원탈퇴가 처리되었습니다.');
    router.push('/');
  };

  return (
    <div className="w-full flex flex-col items-center mt-[100px] gap-6">
      <p className="text-lg font-semibold text-mono_700">
        정말로 <span className="text-main font-bold">회원탈퇴</span>{' '}
        하시겠습니까?
      </p>
      <p className="text-mono_500 text-sm mb-5">
        탈퇴 후 회원 정보는 삭제되며, 복구할 수 없습니다.
      </p>
      <div className="flex gap-4">
        <Button color="primary" onClick={handleWithdraw}>
          예, 탈퇴합니다
        </Button>
        <Button variant="bordered">아니오</Button>
      </div>
    </div>
  );
};

export default Logout;
