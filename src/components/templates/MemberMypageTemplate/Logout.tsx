'use client';

import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import { deleteUserAccount } from '@/apis/userApi';
import { useAuthStore } from '@/stores/memberTypeStore';
import useToast from '@/hooks/useToast';
import ConfirmDrawer from '@/components/molecules/ConfirmDrawer';

const Logout = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const { resetAuth } = useAuthStore();

  const [isOpen, setIsOpen] = useState(false);

  const handleWithdraw = async () => {
    try {
      await deleteUserAccount();
      resetAuth();
      showToast({
        title: '회원탈퇴가 처리되었습니다.',
        description: '탈퇴가 완료되었습니다.',
        lazy: true,
      });
      router.push('/');
    } catch {
      showToast({
        title: '탈퇴 실패',
        description: '탈퇴 중 오류가 발생했습니다.',
        type: 'danger',
        lazy: true,
      });
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center mt-[100px] gap-6 text-base">
        <p className="text-lg font-semibold text-mono_700">
          정말로 <span className="text-main font-bold">회원탈퇴</span>{' '}
          하시겠습니까?
        </p>
        <p className="text-mono_500 text-sm mb-5">
          탈퇴 후 회원 정보는 삭제되며, 복구할 수 없습니다.
        </p>
        <div className="flex gap-4">
          <Button color="primary" onClick={() => setIsOpen(true)}>
            예, 탈퇴합니다
          </Button>
          <Button variant="bordered">아니오</Button>
        </div>
      </div>

      <ConfirmDrawer
        isOpen={isOpen}
        message="탈퇴 후 회원 정보는 삭제되며, 복구할 수 없습니다."
        title="정말로 탈퇴 하시겠습니까 ?"
        onConfirm={handleWithdraw}
        onOpenChange={() => setIsOpen(!isOpen)}
      />
    </>
  );
};

export default Logout;
