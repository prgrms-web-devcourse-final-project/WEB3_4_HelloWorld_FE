'use client';

import {
  HomeIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@heroui/react';
import Link from 'next/link';

import TrainerHeader from '@/components/organisms/TrainerHeader';

interface NavItem {
  label: string;
  href?: string;
  icon: React.ReactNode;
  subItems?: {
    label: string;
    href: string;
  }[];
}

const navItems: NavItem[] = [
  {
    label: '대시보드',
    href: '/mypage',
    icon: <HomeIcon className="w-5 h-5" />,
  },
  {
    label: '헬스장 관리',
    icon: <CalendarIcon className="w-5 h-5" />,
    subItems: [
      { label: '헬스장 수정', href: '/mypage/gym/edit' },
      // { label: '헬스장 예약', href: '/mypage/gym/reservation' },
    ],
  },
  {
    label: 'PT 프로그램',
    icon: <ClipboardDocumentListIcon className="w-5 h-5" />,
    subItems: [
      { label: 'PT 리스트', href: '/mypage/pt' },
      { label: 'PT 예약 내역', href: '/mypage/reservation' },
      { label: 'PT 수강생 목록', href: '/mypage/userlist' },
      { label: 'PT 등록', href: '/mypage/pt/registerpt' },
    ],
  },
  {
    label: '회원정보 수정',
    href: '/mypage/edit',
    icon: <UserIcon className="w-5 h-5" />,
  },
];

export default function TrainerLayoutTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <div className="flex h-screen bg-mono_50">
      {/* 사이드바 */}
      <aside
        className={cn(
          'relative bg-mono_000 shadow-md transition-all duration-300 ease-in-out',
          isExpanded ? 'w-64' : 'w-20',
        )}
      >
        {/* 토글 버튼 */}
        <div
          className={cn(
            'h-16 flex items-center justify-end',
            isExpanded ? 'px-6' : 'px-4 justify-center',
          )}
        >
          <button
            className="p-1.5 hover:bg-mono_100 rounded transition"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? (
              <ChevronLeftIcon className="w-4 h-4" />
            ) : (
              <ChevronRightIcon className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* 네비게이션 */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive =
              (item.href && pathname === item.href) ||
              item.subItems?.some((sub) => pathname.startsWith(sub.href));
            const isOpen = openMenus[item.label] || isActive;

            return (
              <div key={item.label} className="w-full">
                {item.href ? (
                  <Link
                    className={cn(
                      'flex items-center gap-3 rounded-lg text-mono_600 hover:bg-mono_100 transition-all',
                      isExpanded ? 'px-4 py-2.5' : 'p-3 justify-center',
                      isActive && 'bg-mono_100 text-main font-semibold',
                    )}
                    href={item.href}
                    title={!isExpanded ? item.label : undefined}
                  >
                    {item.icon}
                    {isExpanded && <span>{item.label}</span>}
                  </Link>
                ) : (
                  <button
                    className={cn(
                      'w-full flex items-center justify-between gap-3 text-mono_600 font-medium rounded hover:bg-mono_100 transition',
                      isExpanded ? 'px-4 py-2.5' : 'p-3 justify-center',
                      isActive && 'text-main',
                    )}
                    onClick={() => toggleMenu(item.label)}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      {isExpanded && <span>{item.label}</span>}
                    </div>
                    {isExpanded &&
                      item.subItems &&
                      (isOpen ? (
                        <ChevronUpIcon className="w-4 h-4" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4" />
                      ))}
                  </button>
                )}

                {/* 아코디언 서브메뉴 */}
                {isExpanded && isOpen && item.subItems && (
                  <div className="pl-12 flex flex-col gap-1 mt-1">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.href}
                        className={cn(
                          'text-sm text-mono_500 hover:text-main transition',
                          pathname === sub.href && 'text-main font-semibold',
                        )}
                        href={sub.href}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 overflow-auto">
        <TrainerHeader />
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
