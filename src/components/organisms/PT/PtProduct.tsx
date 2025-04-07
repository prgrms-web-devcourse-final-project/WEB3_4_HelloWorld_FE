'use client';
import { Tabs, Tab, Pagination } from '@heroui/react';
import { useState } from 'react';
import { MapPinIcon } from '@heroicons/react/24/solid';

import PtCardList from '@/components/molecules/PT/PtCardList';
import SearchBar from '@/components/molecules/SearchBar';

export default function PtProduct() {
  const items = Array.from({ length: 12 }, (_, index) => index);
  const [, setSelectedTab] = useState<React.Key>('all');

  return (
    <>
      <div className="py-10">
        <div className="flex justify-between items-center pb-10 ">
          <h2 className="text-2xl font-bold">PT 트레이너 리스트</h2>
          <p className="text-mono_600 flex items-center gap-2">
            <MapPinIcon className="w-5 h-5 text-main" />
            <span className="font-bold">서울특별시 강남구 청담동</span> 주변
            검색 결과
          </p>
        </div>
        <div className="flex justify-between items-center py-8 ">
          <Tabs
            aria-label="Options"
            onSelectionChange={(key: React.Key) => setSelectedTab(key)}
          >
            <Tab key="all" title="전체" />
            <Tab key="new" title="최신순" />
            <Tab key="km" title="가까운순" />
          </Tabs>
          <div className="max-w-lg w-full">
            <SearchBar placeholder={'검색어를 입력해주세요'} />
          </div>
        </div>
        <div>
          <PtCardList items={items} />
        </div>
        <div className="flex justify-center items-center py-10 ">
          <Pagination showShadow color="primary" initialPage={1} total={10} />
        </div>
      </div>
    </>
  );
}
