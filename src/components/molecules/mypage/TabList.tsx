import React from 'react';
import { Tabs, TabsProps } from '@heroui/react';

import { TabItem } from '@/components/atoms/TabItem';

interface TabListProps extends Omit<TabsProps, 'children'> {
  tabs: {
    key: string;
    title: string;
  }[];
}

export const TabList: React.FC<TabListProps> = ({ tabs, ...rest }) => {
  return (
    <Tabs
      aria-label="마이페이지 탭 목록"
      className="tab-list-molecule"
      {...rest}
    >
      {tabs.map((tab) => (
        <TabItem key={tab.key} title={tab.title} />
      ))}
    </Tabs>
  );
};
