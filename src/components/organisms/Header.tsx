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

import { ThemeSwitch } from '@/components/atoms/ThemeSwitch';

export default function Header() {
  const path = usePathname();
  const isMainPage = path === '/';

  console.log(path);

  return (
    <div className="fixed w-full z-50">
      <NavbarComponent
        isBlurred
        className={`${isMainPage ? 'text-gray-100' : 'text-mono_700'}`}
        maxWidth="2xl"
        position="sticky"
        classNames={{ base: isMainPage ? 'bg-black/30' : 'bg-mono_100' }}
        // parentRef={document.body}
      >
        <NavbarContent justify="start">
          <NavbarBrand className="">
            <h1
              className={`hidden sm:block text-2xl font-black font-point text-inherit `}
            >
              Gym<span className="text-main">M</span>ate
            </h1>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="gap-10" justify="end">
          <NavbarContent
            className="hidden font-semibold  sm:flex gap-8"
            justify="end"
          >
            <NavbarItem>
              <Link
                className={`${isMainPage ? 'text-gray-100' : 'text-mono_700'}`}
                href="#"
              >
                PT정보
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                className={`${isMainPage ? 'text-gray-100' : 'text-mono_700'}`}
                href="#"
              >
                헬스장정보
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                className={`${isMainPage ? 'text-gray-100' : 'text-mono_700'}`}
                href="#"
              >
                나의운동
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                className={`${isMainPage ? 'text-gray-100' : 'text-mono_700'}`}
                href="#"
              >
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
              <DropdownItem key="settings">마이 페이지</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </NavbarComponent>
    </div>
  );
}
