'use client';
import { Link } from '@heroui/react';
import {
  HomeIcon,
  UserGroupIcon,
  CalendarIcon,
  ChartBarIcon,
  CogIcon,
  ClipboardDocumentListIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { cn } from '@heroui/react';

import TrainerHeader from '@/components/organisms/TrainerHeader';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: '대시보드',
    href: '/trainer',
    icon: <HomeIcon className="w-5 h-5" />,
  },
  {
    label: '회원 관리',
    href: '/trainer/members',
    icon: <UserGroupIcon className="w-5 h-5" />,
  },
  {
    label: '일정 관리',
    href: '/trainer/schedule',
    icon: <CalendarIcon className="w-5 h-5" />,
  },
  {
    label: 'PT 프로그램',
    href: '/trainer/programs',
    icon: <ClipboardDocumentListIcon className="w-5 h-5" />,
  },
  {
    label: '통계',
    href: '/trainer/stats',
    icon: <ChartBarIcon className="w-5 h-5" />,
  },
  {
    label: '설정',
    href: '/trainer/settings',
    icon: <CogIcon className="w-5 h-5" />,
  },
];

export default function TrainerLayoutTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="flex h-screen bg-mono_50">
      {/* 사이드바 */}
      <aside
        className={cn(
          'relative bg-mono_000 shadow-md transition-all duration-300 ease-in-out',
          isExpanded ? 'w-64' : 'w-20',
        )}
      >
        {/* 로고 영역 */}
        <div
          className={cn(
            ' h-16 bg-mono_000  flex items-center justify-end transition-all duration-300',
            isExpanded ? 'px-6' : 'px-4 justify-center',
          )}
        >
          <button
            className=" bg-mono_000 p-1.5  hover:bg-mono_100 transition-colors"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronLeftIcon className="w-4 h-4" />
            ) : (
              <ChevronRightIcon className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* 토글 버튼 */}

        {/* 네비게이션 메뉴 */}
        <nav
          className={cn(
            'p-4 space-y-2',
            !isExpanded && 'flex flex-col items-center',
          )}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg text-mono_600 hover:bg-mono_100 transition-all duration-300',
                isExpanded ? 'px-4 py-2.5' : 'p-3',
              )}
              href={item.href}
              title={!isExpanded ? item.label : undefined}
            >
              {item.icon}
              {isExpanded && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* 메인 컨텐츠 */}
      <main className="flex-1 overflow-auto">
        {/* 상단 헤더 */}
        <TrainerHeader />

        {/* 페이지 컨텐츠 */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
