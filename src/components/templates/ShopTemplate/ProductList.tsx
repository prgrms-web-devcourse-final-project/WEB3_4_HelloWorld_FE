'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { fetchNaverShopping } from '@/apis/naverShoppingApi';
import { NaverProduct } from '@/types/naver';
import Star from '@/components/molecules/StarGroup';

const PRODUCTS_PER_PAGE = 10;

interface Props {
  selectedBrands: string[];
  selectedCategories: string[];
}

const ProductList = ({ selectedBrands, selectedCategories }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryParam = searchParams.get('query') || '헬스';
  const brandParam = searchParams.get('brand') || '';
  const categoryParam = searchParams.get('category') || '';

  const [products, setProducts] = useState<NaverProduct[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const didFetchMap = useRef<Record<number, boolean>>({});

  const query = categoryParam || queryParam;
  const brand = brandParam;
  const category = categoryParam;

  useEffect(() => {
    const searchParams = new URLSearchParams();

    if (selectedBrands[0]) searchParams.set('brand', selectedBrands[0]);
    if (selectedCategories[0]) {
      searchParams.set('category', selectedCategories[0]);
    } else {
      searchParams.set('query', queryParam);
    }
    router.push(`/shop?${searchParams.toString()}`);
  }, [selectedBrands, selectedCategories]);

  const getData = async (currentPage: number) => {
    if (didFetchMap.current[currentPage]) return;
    didFetchMap.current[currentPage] = true;

    try {
      setLoading(true);

      const start = 1;
      const items = await fetchNaverShopping(query, start, 100);

      if (items.length === 0) {
        setHasMore(false);

        return;
      }

      const normalizedItems = items.map((item: NaverProduct, idx: number) => ({
        ...item,
        id: `${encodeURIComponent(query)}_${idx + 1}`,
        brand: extractBrand(item.title),
        category3: extractCategory(item.title),
      }));

      setProducts(normalizedItems);
    } catch {
      throw new Error('Naver API 호출 실패');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    didFetchMap.current = {};
    getData(1);
  }, [query, brand]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  const filtered = products.filter((product) => {
    const b = product.brand?.trim() || '';
    const c = product.category3?.trim() || '';

    const brandMatch = !brand || b === brand;
    const categoryMatch = !category || c === category;

    return brandMatch && categoryMatch;
  });

  return (
    <div className="flex flex-col items-center w-full max-w-[1440px] px-8 mx-auto">
      <div className="grid grid-cols-2 gap-10 w-full">
        {filtered
          .slice(0, page * PRODUCTS_PER_PAGE)
          .map(({ title, image, lprice, mallName, id }, i) => (
            <Link
              key={`${title}-${i}`}
              className="flex w-full bg-mono_000 rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              href={`/shop/${id}`}
            >
              <div className="shrink-0 w-[273px] h-[263px] relative self-stretch">
                <Image
                  fill
                  alt="상품 이미지"
                  className="object-cover rounded"
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, 273px"
                  src={image}
                />
              </div>

              <div className="flex flex-col justify-between py-4 px-5 flex-1">
                <div className="flex flex-col justify-between h-full">
                  <div className="mb-[10px]">
                    <p className="text-[12px] text-mono_400 mb-1">{mallName}</p>
                    <p
                      dangerouslySetInnerHTML={{ __html: title }}
                      className="text-xs font-semibold text-mono_800 mb-2 line-clamp-2"
                    />
                    <Star readonly h="h-4" rate={3} w="w-4" />
                  </div>

                  <div className="mt-[10px]">
                    <p className="text-base font-bold text-mono_900 mb-3 text-end">
                      {Number(lprice).toLocaleString()} 원
                    </p>
                    <div className="flex justify-end">
                      <button className="w-[170px] h-[37px] rounded-md bg-main text-white text-sm hover:opacity-90 transition dark:text-white">
                        구매하러가기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>

      {hasMore && filtered.length > page * PRODUCTS_PER_PAGE && (
        <div className="flex justify-center w-full pb-8">
          <button
            className="w-[290px] h-[37px] mt-[50px] mb-[200px] rounded-md bg-main text-white text-sm hover:opacity-90 transition"
            disabled={loading}
            onClick={handleLoadMore}
          >
            {loading ? '불러오는 중...' : '더보기'}
          </button>
        </div>
      )}
    </div>
  );
};

const extractBrand = (title: string): string => {
  const brandCandidates = [
    '아이워너',
    '바디엑스',
    '앱킨',
    '이고진',
    '핏에이블',
    '반석',
    '아디다스',
  ];

  return brandCandidates.find((brand) => title.includes(brand)) || '';
};

const extractCategory = (title: string): string => {
  const categoryMap: Record<string, string> = {
    하체근력운동기구: '하체근력운동기구',
    전동운동기구: '전동운동기구',
    스쿼트운동기구: '스쿼트운동기구',
    근력운동기구: '근력운동기구',
    가방: '가방',
    기타용품: '기타 용품',
  };

  const found = Object.entries(categoryMap).find(([keyword]) =>
    title.includes(keyword),
  );

  return found?.[1] || '';
};

export default ProductList;
