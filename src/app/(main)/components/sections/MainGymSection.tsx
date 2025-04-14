import KakaoMap from '@/components/atoms/KakaoMap';
import MainGymCardItem from '@/components/molecules/Main/MainGymCardItem';
import MainSection from '@/components/organisms/Main/MainSection';
import {
  MainGymIcon,
  MainMapIcon,
  MainPtIcon,
  MainTrainerIcon,
} from '@/config/icons';

export default function MainGymSection() {
  return (
    <MainSection
      isRouteButton
      buttonText="우리동네 헬스장 찾기"
      description="우리 동네에서 인기 있는 헬스장을 한눈에 확인하고,
나에게 맞는 운동 공간을 찾아보세요."
      link="/gym"
      subTitle="동네 헬스장"
      title="우리동네 GYM"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col gap-4 md:col-span-1 col-span-3">
          <MainGymCardItem
            description="우리동네 헬스장이 궁금하다면?"
            icon={<MainMapIcon className="text-mono_300" size={70} />}
            link={'/gym'}
            title="지도로 헬스장 찾기"
          />
          <MainGymCardItem
            description="나의 오운했 통계를 한번에"
            icon={<MainGymIcon className="text-mono_300" size={70} />}
            link={'/myfitness'}
            title="오운했 작성하러 가기"
          />
          <MainGymCardItem
            description="전문적으로 PT를 받고싶다면"
            icon={<MainTrainerIcon className="text-mono_300" size={70} />}
            link={'/pt'}
            title="PT선생님 찾으러 가기"
          />
        </div>

        <KakaoMap />
        <div className="md:flex-row flex flex-col col-span-3 gap-6">
          <MainGymCardItem
            className="w-full"
            description="포인트 할인받고 충천하자"
            icon={<MainPtIcon className="text-mono_300" size={70} />}
            link={'/point'}
            title="포인트 결제하기"
          />
          <MainGymCardItem
            className="w-full"
            description={'헬스 용품을 한눈에'}
            icon={<MainMapIcon className="text-mono_300" size={70} />}
            link={''}
            title="헬스용품 찾으러 가기"
          />
        </div>
      </div>
    </MainSection>
  );
}
