'use client';

import {
  Navbar as NavbarComponent,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from '@heroui/react';
import { usePathname, useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import Link from 'next/link';

import { ThemeSwitch } from '@/components/atoms/ThemeSwitch';
import { logoutUser } from '@/apis/userApi';
import { useMemberStore } from '@/stores/testAuthStore';
export default function Header() {
  const path = usePathname();
  const router = useRouter();
  const { isLoggedIn, userType, clearUser } = useMemberStore();

  const isMainPage = path === '/' || path.includes('pt');

  const navTextClass = clsx('text-mono_700', {
    'text-gray-100': isMainPage,
  });

  const navBgClass = clsx({
    'bg-black/30': isMainPage,
    'bg-mono_100': !isMainPage,
  });

  //오너 페이지 따로 분리 할 경우 경로
  const handleMyPageClick = () => {
    if (userType === 'member') router.push('/membermypage');
    else if (userType === 'owner') router.push('/mypage');
    else router.push('/mypage');
  };

  const handlePointClick = () => router.push('/point');
  const handleLoginOrSignup = () => router.push('/login');
  const handleLogout = async () => {
    try {
      await logoutUser();
      clearUser();
      router.refresh();
    } catch {
      alert('로그아웃에 실패했습니다. 다시 시도 해주세요.');
    }
  };

  return (
    <div className="fixed w-full z-50">
      <NavbarComponent
        isBlurred
        className={navTextClass}
        classNames={{ base: navBgClass }}
        maxWidth="2xl"
        position="sticky"
      >
        <NavbarContent justify="start">
          <NavbarBrand>
            <Link className={navTextClass} href="/">
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

          {isLoggedIn ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="User"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem
                  key="profile"
                  isDisabled
                  isReadOnly
                  className="h-14 gap-2"
                >
                  <p className="font-semibold">남은캐시 : 10000원</p>
                </DropdownItem>
                <DropdownItem key="settings" onClick={handleMyPageClick}>
                  마이 페이지
                </DropdownItem>
                <DropdownItem key="point" onClick={handlePointClick}>
                  포인트 충전
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={handleLogout}
                >
                  로그아웃
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button color="primary" size="sm" onClick={handleLoginOrSignup}>
              로그인 / 회원가입
            </Button>
          )}
        </NavbarContent>
      </NavbarComponent>
    </div>
  );
}
