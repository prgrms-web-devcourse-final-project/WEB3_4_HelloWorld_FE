'use client';

import {
  Navbar as NavbarComponent,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from '@heroui/react';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ThemeSwitch } from '@/components/atoms/ThemeSwitch';
import { deleteTrainerAccount, logoutUser } from '@/apis/userApi';
import { useAuthStore } from '@/stores/memberTypeStore';
import useToast from '@/hooks/useToast';
import ConfirmDrawer from '@/components/molecules/ConfirmDrawer';
import { formatCash } from '@/utils/formatter';

export default function TrainerHeader() {
  const path = usePathname();
  const router = useRouter();
  const isMainPage = path === '/' || path.includes('pt');
  const { user } = useAuthStore();
  const { showToast } = useToast();
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  const toggleWithdrawDrawer = () => setIsWithdrawOpen((prev) => !prev);

  const navTextClass = clsx('text-mono_700', {
    'text-gray-100': isMainPage,
  });

  const navBgClass = clsx({
    'bg-black/30': isMainPage,
    'bg-mono_100': !isMainPage,
  });

  const handleLogout = async () => {
    try {
      await logoutUser();
      useAuthStore.getState().resetAuth();
      showToast({
        title: '로그아웃 되었습니다.',
        description: '다음에 다시 방문해주세요.',
      });
      router.push('/');
    } catch {
      showToast({
        title: '로그아웃 실패',
        description: '다시 시도해주세요.',
      });
    }
  };

  const handleWithdraw = async () => {
    try {
      await deleteTrainerAccount();
      useAuthStore.getState().resetAuth();
      showToast({
        title: '회원탈퇴 되었습니다.',
        description: '이용해 주셔서 감사합니다.',
      });
      router.push('/');
    } catch {
      showToast({
        title: '회원탈퇴 실패',
        description: '다시 시도해주세요.',
      });
    }
  };

  return (
    <>
      <NavbarComponent
        isBlurred
        className={navTextClass}
        classNames={{ base: navBgClass }}
        maxWidth="full"
        position="sticky"
      >
        <NavbarContent justify="start">
          <NavbarBrand>
            <Link href="/">
              <h1 className="hidden sm:block text-2xl font-black font-point text-inherit">
                Gym<span className="text-main">M</span>ate
              </h1>
            </Link>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="gap-10" justify="end">
          <NavbarContent
            className="hidden font-semibold sm:flex gap-8"
            justify="end"
          >
            <NavbarItem>
              <Link className={navTextClass} href="/pt">
                PT정보
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link className={navTextClass} href="/gym">
                헬스장정보
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link className={navTextClass} href="/myfitness">
                나의운동
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link className={navTextClass} href="/shop">
                헬스용품
              </Link>
            </NavbarItem>
          </NavbarContent>
          <ThemeSwitch />
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src={user?.profileImage && '/public/gym/icons/healthboy.jpg'}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="profile"
                isDisabled
                isReadOnly
                className="h-14 gap-2"
              >
                <p className="font-semibold">
                  남은캐시 : {formatCash(Number(user?.cash))}원
                </p>
              </DropdownItem>
              <DropdownItem key="settings">마이 페이지</DropdownItem>
              <DropdownItem key="point" onClick={() => router.push('/point')}>
                포인트 충전
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                로그아웃
              </DropdownItem>
              <DropdownItem
                key="withdraw"
                color="danger"
                onClick={toggleWithdrawDrawer}
              >
                회원탈퇴
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </NavbarComponent>
      <ConfirmDrawer
        isOpen={isWithdrawOpen}
        message="정말 회원탈퇴 하시겠습니까?"
        title="회원탈퇴"
        onConfirm={handleWithdraw}
        onOpenChange={toggleWithdrawDrawer}
      />
    </>
  );
}
