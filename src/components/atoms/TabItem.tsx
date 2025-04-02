import React from 'react';
import { Tab } from '@heroui/react';

export const TabItem: React.FC<TabProps> = ({ title, ...props }) => {
  return <Tab className="tab-atom" title={title} {...props} />;
};
