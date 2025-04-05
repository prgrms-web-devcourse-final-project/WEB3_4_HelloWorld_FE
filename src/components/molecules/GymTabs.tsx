// GymTabs.tsx

import { Tabs, Tab } from '@heroui/react';

interface GymTabsProps {
  selectedTab: string;
  onChange: (key: string) => void;
}

export default function GymTabs({ selectedTab, onChange }: GymTabsProps) {
  return (
    <Tabs
      aria-label="Gym Tabs"
      className="h-[48px] w-full"
      classNames={{
        tabList: 'flex h-full w-full items-end gap-0 p-0 px-0', // <-- 중요
        tabWrapper: 'flex-1 h-full p-0',
        tab: `
      flex w-full h-full items-center justify-center 
      px-0 pb-0
    `,
        tabContent: `
      h-full flex items-center justify-center
      text-[16px] font-medium font-pretendard
      text-mono_600
      data-[selected=true]:text-mono_900
      hover:text-mono_900
      transition
    `,
        cursor: 'bg-main h-[3px] -bottom-[1px]',
      }}
      selectedKey={selectedTab}
      variant="underlined"
      onSelectionChange={(key) => onChange(String(key))}
    >
      <Tab key="home" title="홈" />
      <Tab key="instructors" title="강사" />
      <Tab key="review" title="리뷰" />
      <Tab key="facility" title="시설" />
    </Tabs>
  );
}
