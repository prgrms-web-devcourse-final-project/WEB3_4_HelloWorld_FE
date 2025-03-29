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

import { ThemeSwitch } from '@/components/atoms/ThemeSwitch';

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function Header() {
  return (
    <NavbarComponent className="bg-mono_100" maxWidth="2xl">
      <NavbarContent justify="start">
        <NavbarBrand className="">
          <h1 className="hidden sm:block text-2xl font-black font-point text-mono_600 text-inherit">
            Gym<span className="text-main">M</span>ate
          </h1>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="gap-10" justify="end">
        <NavbarContent
          className="hidden font-semibold text-mono_600 sm:flex gap-8"
          justify="end"
        >
          <NavbarItem>
            <Link color="foreground" href="#">
              PT정보
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              헬스장정보
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              나의운동
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
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
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </NavbarComponent>
  );
}
