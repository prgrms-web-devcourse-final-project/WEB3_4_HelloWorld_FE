import { Tabs as HeroTabs, Tab } from '@heroui/react';
import { Key } from 'react';

export default function Tabs({
  tabs,
  fullWidth = false,
  setSelectedKey,
}: {
  tabs: any[];
  fullWidth?: boolean;
  setSelectedKey: (key: Key) => void;
}) {
  return (
    <div className="flex w-full flex-col">
      <HeroTabs fullWidth={fullWidth} onSelectionChange={setSelectedKey}>
        {tabs.map((item) => (
          <Tab key={item.id} title={item.label} />
        ))}
      </HeroTabs>
    </div>
  );
}
