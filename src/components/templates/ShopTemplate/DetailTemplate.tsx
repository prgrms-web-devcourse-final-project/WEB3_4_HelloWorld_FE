'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  HeartIcon as HeartOutline,
  ShareIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

import { fetchNaverShopping } from '@/apis/naverShoppingApi';
import { NaverProduct } from '@/types/naver';
import Star from '@/components/molecules/StarGroup';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<NaverProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<NaverProduct[]>([]);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!id || typeof id !== 'string') return;

    const decoded = decodeURIComponent(id);
    const [query, indexStr] = decoded.split('_');
    const index = parseInt(indexStr, 10);

    const fetchData = async () => {
      const data: NaverProduct[] = await fetchNaverShopping(query, 1, 100);

      if (data?.length && data[index - 1]) {
        setProduct(data[index - 1]);

        const others = data
          .filter((_, i: number) => i !== index - 1)
          .slice(0, 4);

        setRelatedProducts(others);
      }
    };

    fetchData();
  }, [id]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('URL이 복사되었습니다!');
    } catch {
      alert('URL 복사에 실패했습니다.');
    }
  };

  if (!product) return <div className="p-10">불러오는 중...</div>;

  const query = decodeURIComponent(id as string).split('_')[0];

  return (
    <section className="flex flex-col gap-20 px-10 pt-24 pb-10 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1 flex justify-center items-center">
          <Image
            priority
            alt="상품 이미지"
            className="rounded-xl object-cover"
            height={500}
            src={product.image}
            style={{ height: 'auto' }}
            width={500}
          />
        </div>

        <div className="flex-1 flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-[13px]">
              <p>
                Gym<span className="text-main">M</span>ate
              </p>
            </div>
            <p className="text-sm text-mono_400 mb-[10px]">
              {product.mallName}
            </p>
            <h1
              dangerouslySetInnerHTML={{ __html: product.title }}
              className="text-xl font-bold text-mono_900 mb-[10px]"
            />
            <Star readonly h="h-5" rate={3} w="w-5" />
          </div>

          <div className="flex flex-col items-end gap-2">
            <p className="text-lg font-semibold text-mono_900">
              가격: {Number(product.lprice).toLocaleString()} 원
            </p>

            <div className="flex gap-4 flex-wrap justify-end">
              <button
                className="w-[240px] h-[48px] flex items-center border border-mono_200 justify-center rounded-md bg-mono_000 text-mono_900 text-sm hover:opacity-90 cursor-pointer gap-2"
                onClick={() => setLiked(!liked)}
              >
                {liked ? (
                  <HeartSolid className="w-4 h-4 text-main" />
                ) : (
                  <HeartOutline className="w-4 h-4" />
                )}
                찜하기
              </button>
              <button
                className="w-[240px] h-[48px] flex items-center border border-mono_200 justify-center rounded-md bg-mono_000 text-mono_900 text-sm hover:opacity-90 cursor-pointer gap-2"
                onClick={handleCopy}
              >
                <ShareIcon className="w-4 h-4" /> 공유하기
              </button>
              <a
                className="w-[495px] h-[48px] flex items-center justify-center rounded-md bg-main text-white text-sm hover:opacity-90 transition"
                href={product.link}
                rel="noreferrer"
                target="_blank"
              >
                네이버에서 구매하기
              </a>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="ml-2">
          <h2 className="font-point text-2xl font-bold mb-[25px] text-mono_900">
            추천 상품
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {relatedProducts.map((item, i) => {
              const itemUrl = `/shop/${encodeURIComponent(`${query}_${i + 1}`)}`;

              return (
                <Link
                  key={`item-${i}`}
                  className="flex flex-col items-start hover:shadow-md transition w-[230px]"
                  href={itemUrl}
                >
                  <Image
                    alt="관련 상품 이미지"
                    className="rounded object-cover w-[230px] h-[230px]"
                    height={230}
                    src={item.image}
                    width={230}
                  />
                  <p
                    dangerouslySetInnerHTML={{ __html: item.title }}
                    className="text-sm font-medium text-mono_900 mt-2 leading-tight"
                  />
                  <div className="flex flex-col w-full items-end mt-2 px-[10px]">
                    <p className="text-xs text-mono_400">{item.mallName}</p>
                    <p className="text-sm font-semibold text-mono_900">
                      {Number(item.lprice).toLocaleString()} 원
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetailPage;
