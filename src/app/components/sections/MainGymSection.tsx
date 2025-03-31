import KakaoMap from '@/components/atoms/KakaoMap';
import MainGymCardItem from '@/components/molecules/Main/MainGymCardItem';
import MainSection from '@/components/organisms/Main/MainSection';
import { MainMapIcon } from '@/config/icons';

export default function MainGymSection() {
  return (
    <MainSection
      isRouteButton
      buttonText="나의 트레이너 찾기"
      description="짐 메이트와 함께하는 사용자와 전문가들이 늘고 있다~~ 정도"
      subTitle="동네 헬스장"
      title="우리동네 GYM"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col gap-4 md:col-span-1 col-span-3">
          <MainGymCardItem
            description="우리동네 헬스장이 궁금하다면?"
            icon={
              <MainMapIcon
                borderColor="main"
                className="text-main"
                fillColor={'var(--heroui-main)'}
                size={70}
              />
            }
            title="지도로 헬스장 찾기"
          />
          <MainGymCardItem
            description="나의 오운했 통계를 한번에"
            icon={
              <MainMapIcon
                borderColor="main"
                className="text-main"
                fillColor={'var(--heroui-main)'}
                size={70}
              />
            }
            title="오운했 작성하러 가기"
          />
          <MainGymCardItem
            description="전문적으로 PT를 받고싶다면"
            icon={
              <MainMapIcon
                borderColor="main"
                className="text-main"
                fillColor={'var(--heroui-main)'}
                size={70}
              />
            }
            title="PT선생님 찾으러 가기"
          />
        </div>

        <KakaoMap className="md:col-span-2 col-span-3 w-full rounded-lg" />
        <div className="md:flex-row flex flex-col col-span-3 gap-6">
          <MainGymCardItem
            className="w-full"
            description="전문적으로 PT를 받고싶다면"
            icon={
              <MainMapIcon
                borderColor="main"
                className="text-main"
                fillColor={'var(--heroui-main)'}
                size={70}
              />
            }
            title="PT선생님 찾으러 가기"
          />
          <MainGymCardItem
            className="w-full"
            description="전문적으로 PT를 받고싶다면"
            icon={
              <MainMapIcon
                borderColor="main"
                className="text-main"
                fillColor={'var(--heroui-main)'}
                size={70}
              />
            }
            title="PT선생님 찾으러 가기"
          />
        </div>
      </div>
    </MainSection>
  );
}
