import ShopProductItem from '@/components/molecules/ShopProductItem';
import MainSection from '@/components/organisms/Main/MainSection';

export default function MainShopSection() {
  const item = {
    title: '손목보호대',
    img: 'https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0014/B00000014633314ko.jpg?l=ko',
    price: '10,000원',
  };

  return (
    <>
      <MainSection
        description="짐 메이트와 함께하는 사용자와 전문가들이 늘고 있다~~ 정도"
        subTitle="베스트 추천 상품"
        title="헬스 용품도 GYM MATE"
      >
        <div className="flex gap-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index}>
              <ShopProductItem item={item} />
            </div>
          ))}
        </div>
      </MainSection>
    </>
  );
}
