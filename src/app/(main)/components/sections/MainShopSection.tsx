import { useEffect, useState } from 'react';

import { fetchNaverShopping } from '@/apis/naverShoppingApi';
import ShopProductItem from '@/components/molecules/ShopProductItem';
import MainSection from '@/components/organisms/Main/MainSection';

export default function MainShopSection() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await fetchNaverShopping('헬스', 1, 5);

    console.log(res);
    setData(res);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <MainSection
        isRouteButton
        buttonText="더 많은 상품 보러가기"
        description="운동에 필요한 모든 용품을 한 곳에서!
검증된 퀄리티의 아이템을 편하게 만나보세요."
        link="/shop"
        subTitle="베스트 추천 상품"
        title="헬스 용품도 GYM MATE"
      >
        <div className="grid grid-cols-5 gap-5">
          {data.map((item, index) => (
            <div key={index}>
              <ShopProductItem item={item} />
            </div>
          ))}
        </div>
      </MainSection>
    </>
  );
}
