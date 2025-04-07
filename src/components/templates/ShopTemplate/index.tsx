'use client';

import { useState } from 'react';

import FilterSidebar from '@/components/templates/ShopTemplate/FilterSidebar';
import ProductList from '@/components/templates/ShopTemplate/ProductList';

const ShopTemplate = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="flex px-10 gap-10 w-full max-w-[1440px] mx-auto pt-[100px] min-h-[80vh]">
      <div className="w-[280px] shrink-0">
        <FilterSidebar
          selectedBrands={selectedBrands}
          selectedCategories={selectedCategories}
          setSelectedBrands={setSelectedBrands}
          setSelectedCategories={setSelectedCategories}
        />
      </div>

      <div className="flex-1 bg-mono_000 rounded-xl shadow-inner min-h-[500px]">
        <ProductList
          selectedBrands={selectedBrands}
          selectedCategories={selectedCategories}
        />
      </div>
    </div>
  );
};

export default ShopTemplate;
