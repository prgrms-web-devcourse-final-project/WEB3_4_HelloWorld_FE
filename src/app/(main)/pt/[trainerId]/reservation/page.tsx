'use client';

import { Calendar, Card, RadioGroup } from '@heroui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getLocalTimeZone, today } from '@internationalized/date';

import { MyButton } from '@/components/atoms/Button';
import GymListCardItem from '@/components/molecules/GYM/GymListCardItem';
import MainPtCard from '@/components/molecules/Main/MainPtCard';
import PtCardSection from '@/components/molecules/PT/PtCardSection';
import ScheduleTimeCheckGroup from '@/components/organisms/ScheduleTimeCheckGroup';
import PtLayout from '@/components/templates/PtTemplate/PtLayout';
import fetcher from '@/utils/apiInstance';
import { PtDetailResponse } from '@/types/pt.types';
import { PtPlanGroup } from '@/components/molecules/PT/PtPlanGroup';
import useToast from '@/hooks/useToast';
import { formatCash } from '@/utils/formatter';
type AvailableResponse = {
  availableTimes: AvailableTimesType;
};
type AvailableTimesType = {
  [key: string]: number[];
};
export default function PtReservationPage() {
  const { showToast } = useToast();
  const params = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['ptProductDetail', params.trainerId],
    queryFn: async () => {
      const response = await fetcher<PtDetailResponse>(
        `/ptProduct/trainer/${params.trainerId}`,
        {
          method: 'GET',
          token: false,
        },
      );

      return response;
    },
    enabled: !!params.trainerId,
  });
  const { mutate, data: time } = useMutation({
    mutationFn: async ({ year, month }: { year: number; month: number }) => {
      const res = await fetcher<AvailableResponse>(
        `/reservation/trainer/${params.trainerId}/month?year=${year}&month=${month}`,
        {
          method: 'GET',
        },
      );

      return res;
    },
    onSuccess: () => {},
    onError: () => {
      showToast({
        title: '수정 실패',
        description: '트레이너 정보 수정에 실패했습니다.',
      });
    },
  });

  if (!data) return <p> 정보가 없습니다.</p>;

  return (
    <PtLayout>
      <div className="flex   gap-8">
        <div className="w-full flex flex-col gap-8">
          <PtCardSection title="헬스장 정보">
            <GymListCardItem gym={data?.gym!} />
          </PtCardSection>
          <PtCardSection title="상품선택">
            <RadioGroup>
              {data.ptProducts?.map((item, index) => (
                <PtPlanGroup
                  key={index}
                  description={formatCash(item.fee) + '원'}
                  imageSrc={item.images[0]}
                  value={String(item.ptProductId)}
                >
                  <p className="text-lg font-semibold">{item.productName}</p>
                  <div className="n text-mono_500">{item.ptInfo}</div>
                </PtPlanGroup>
              ))}
            </RadioGroup>
          </PtCardSection>
          <PtCardSection>
            <Calendar
              aria-label="Date (Controlled)"
              bottomContent={
                <ScheduleTimeCheckGroup
                  availableTimes={time?.availableTimes}
                  isReadOnly={false}
                />
              }
              classNames={{
                headerWrapper: 'py-4',
                title: 'text-lg',
                base: 'w-full',
                gridWrapper: 'w-full py-4',
                content: 'w-full',
                gridBody: 'bg-mono_000',
                gridBodyRow: 'justify-around',
                gridHeaderRow: 'justify-around px-0',
              }}
              defaultValue={today(getLocalTimeZone())}
              minValue={today(getLocalTimeZone())}
              onChange={(e) => {
                console.log(e);
              }}
              onFocusChange={
                (e) => console.log(e)
                // mutate({ year: e.year, month: e.month })
              }
            />
          </PtCardSection>
        </div>
        <div className="h-full max-w-[320px] sticky  hidden md:block top-20 w-full">
          <div className="  ">
            <Card className="p-2 flex flex-col gap-2 w-full">
              <MainPtCard
                awards={data.trainer?.awards}
                backgroundImage={data.trainer?.profile ?? ''}
                content={data?.trainer?.trainerName ?? ''}
                id={String(data.trainer?.trainerId ?? '')}
                score={data.trainer?.trainerScore ?? 0}
                title={data.trainer?.trainerName ?? ''}
              />

              <MyButton>예약하기</MyButton>
            </Card>
          </div>
        </div>
      </div>
    </PtLayout>
  );
}
