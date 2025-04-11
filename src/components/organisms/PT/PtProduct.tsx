'use client';
import { Tabs, Tab, Pagination, SharedSelection } from '@heroui/react';
import { useState } from 'react';
import { MapPinIcon } from '@heroicons/react/24/solid';

import PtCardList from '@/components/molecules/PT/PtCardList';
import SearchBar from '@/components/molecules/SearchBar';
import useCreateQuery from '@/hooks/useCreateQuery';
import useToast from '@/hooks/useToast';
import Loading from '@/app/loading';
import { useAuthStore } from '@/stores/memberTypeStore';

export default function PtProduct({ ptProduct }: { ptProduct: any }) {
  const [search, setSearch] = useState('');
  const { showToast } = useToast();
  const [keyword, setKeyword] = useState('');
  const { user } = useAuthStore();
  const createQueryStrings = useCreateQuery();
  const onSearch = () => {
    console.log(search);
    if (keyword !== '' || search !== '') {
      createQueryStrings({
        searchTerm: search,
        searchOption: keyword,
      });
    } else {
      showToast({
        title: '검색어를 입력해주세요',
        description: '검색어를 입력해주세요',
        type: 'danger',
      });
    }
  };
  const inputChange = (value: string) => {
    setSearch(value);
  };
  const onKeywordChange = (key: SharedSelection) => {
    setKeyword(key.currentKey ?? '');
  };
  const searchOption = [
    {
      key: 'trainer',
      label: '트레이너',
    },
    {
      key: 'ptProduct',
      label: 'PT 상품',
    },
    {
      key: 'district',
      label: '지역',
    },
  ];

  console.log(ptProduct);
  if (!ptProduct) return <Loading />;

  return (
    <>
      <div className="py-10">
        <div className="flex justify-between items-center pb-10 ">
          <h2 className="text-2xl font-bold">PT 트레이너 리스트</h2>

          {user?.address && (
            <p className="text-mono_600 flex items-center gap-2">
              <MapPinIcon className="w-5 h-5 text-main" />
              <span className="font-bold">{user.address}</span> 주변 검색 결과
            </p>
          )}
        </div>
        <div className="flex justify-between items-center py-8 ">
          <Tabs
            aria-label="Options"
            onSelectionChange={(key: React.Key) => {
              createQueryStrings({ sortOption: key.toString() });
            }}
          >
            <Tab key="" title="전체" />
            <Tab key="score" title="리뷰순" />
            <Tab key="latest" title="최신순" />
            <Tab key="nearby" title="가까운순" />
          </Tabs>
          <div className="max-w-lg w-full">
            <SearchBar
              inputChange={inputChange}
              placeholder={'검색어를 입력해주세요'}
              searchChange={onKeywordChange}
              searchOption={searchOption}
              onSearch={onSearch}
            />
          </div>
        </div>
        <div>
          <PtCardList items={ptProduct.content} />
        </div>
        <div className="flex justify-center items-center py-10 ">
          <Pagination
            showShadow
            color="primary"
            page={ptProduct.currentPage}
            total={ptProduct.totalPages}
            onChange={(page) => {
              createQueryStrings({ page: page.toString() });
            }}
          />
        </div>
      </div>
    </>
  );
}
