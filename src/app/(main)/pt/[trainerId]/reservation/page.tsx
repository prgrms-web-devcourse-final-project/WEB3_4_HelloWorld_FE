'use client';

import { Card } from '@heroui/react';

import { MyButton } from '@/components/atoms/Button';
import GymListCardItem from '@/components/molecules/GYM/GymListCardItem';
import MainPtCard from '@/components/molecules/Main/MainPtCard';
import PtCardSection from '@/components/molecules/PT/PtCardSection';
import ScheduleTimeCheckGroup from '@/components/organisms/ScheduleTimeCheckGroup';
import PtLayout from '@/components/templates/PtTemplate/PtLayout';

export default function PtReservationPage() {
  return (
    <PtLayout>
      <div className="flex   gap-8">
        <div className="w-full flex flex-col gap-8">
          <PtCardSection title="헬스장 정보">
            <GymListCardItem />
          </PtCardSection>
          <PtCardSection title="예약시간">
            <ScheduleTimeCheckGroup isReadOnly={false} />
          </PtCardSection>
        </div>
        <div className="h-full max-w-[320px] sticky  hidden md:block top-20 w-full">
          <div className="  ">
            <Card className="p-2 flex flex-col gap-2 w-full">
              <MainPtCard backgroundImage={''} content={'dd'} title={'dd'} />
              <MyButton>예약하기</MyButton>
            </Card>
          </div>
        </div>
      </div>
    </PtLayout>
  );
}
