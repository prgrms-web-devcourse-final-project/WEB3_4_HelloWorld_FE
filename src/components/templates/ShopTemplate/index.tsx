'use client';

import { useState } from 'react';

import FilterSidebar from '@/components/templates/ShopTemplate/FilterSidebar';
import ProductList from '@/components/templates/ShopTemplate/ProductList';

const ShopTemplate = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="flex gap-10 w-full max-w-[1440px] mx-auto px-4 pt-[100px] min-h-[80vh]">
      {/* 고정 너비 + sticky 사이드바 */}
      <div className="w-[280px] shrink-0">
        <div className="sticky top-[100px] h-fit">
          <FilterSidebar
            selectedBrands={selectedBrands}
            selectedCategories={selectedCategories}
            setSelectedBrands={setSelectedBrands}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
      </div>

      {/* 유동적인 오른쪽 콘텐츠 */}
      <div className="flex-1 min-w-0">
        <ProductList
          selectedBrands={selectedBrands}
          selectedCategories={selectedCategories}
        />
      </div>
    </div>
  );
};

export default ShopTemplate;
