'use client';

import { useState } from 'react';
import { Input } from '@nextui-org/react';

import SelectedChips from '@/components/atoms/SelectedChips';
import FilterCheckboxList from '@/components/templates/ShopTemplate/FilterCheckboxList';

const brandList = [
  '아이워너',
  '바디엑스',
  '앱킨',
  '이고진',
  '핏에이블',
  '반석',
];

const categoryList = [
  '하체근력운동기구',
  '전동운동기구',
  '스쿼트운동기구',
  '근력운동기구',
  '가방',
  '기타 용품',
];

interface Props {
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterSidebar = ({
  selectedBrands,
  setSelectedBrands,
  selectedCategories,
  setSelectedCategories,
}: Props) => {
  const [brandSearch, setBrandSearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');

  const handleReset = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
  };

  const handleRemove = (item: string) => {
    setSelectedBrands((prev) => prev.filter((b) => b !== item));
    setSelectedCategories((prev) => prev.filter((c) => c !== item));
  };

  return (
    <aside className="w-[250px] p-4 rounded-xl shadow bg-mono_000">
      {/* 선택된 옵션 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-sm">선택된 옵션</span>
          <button className="text-xs text-mono_400" onClick={handleReset}>
            ↻
          </button>
        </div>
        <SelectedChips
          items={[...selectedBrands, ...selectedCategories]}
          onRemove={handleRemove}
        />
      </div>

      {/* 브랜드 필터 */}
      <div className="mb-6">
        <p className="font-bold text-sm mb-2">브랜드</p>
        <Input
          className="mb-2"
          placeholder="브랜드 입력"
          radius="sm"
          size="sm"
          value={brandSearch}
          onChange={(e) => setBrandSearch(e.target.value)}
        />
        <FilterCheckboxList
          options={brandList.filter((b) => b.includes(brandSearch))}
          selected={selectedBrands}
          onChange={setSelectedBrands}
        />
      </div>

      {/* 카테고리 필터 */}
      <div>
        <p className="font-bold text-sm mb-2">카테고리</p>
        <Input
          className="mb-2"
          placeholder="카테고리 입력"
          radius="sm"
          size="sm"
          value={categorySearch}
          onChange={(e) => setCategorySearch(e.target.value)}
        />
        <FilterCheckboxList
          options={categoryList.filter((c) => c.includes(categorySearch))}
          selected={selectedCategories}
          onChange={setSelectedCategories}
        />
      </div>
    </aside>
  );
};

export default FilterSidebar;
