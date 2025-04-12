'use client';

import { Button, useDisclosure } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import PtCardSection from '@/components/molecules/PT/PtCardSection';
import PtProductItem from '@/components/molecules/PT/PtProductItem';
import ScheduleTimeCheckGroup from '@/components/organisms/ScheduleTimeCheckGroup';
import Drawer from '@/components/atoms/Drawer';
import fetcher from '@/utils/apiInstance';
import { useAuthStore } from '@/stores/memberTypeStore';
import { PtDetailResponse, PtProduct } from '@/types/pt.types';
import useToast from '@/hooks/useToast';
import { initAvailableTimes } from '@/constants/pt_schedules';

type AvailableResponse = {
  availableTimes: AvailableTimesType;
};
type AvailableTimesType = {
  [key: string]: number[];
};
export default function PtPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { user } = useAuthStore();
  const [week, setWeek] = useState<number>(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data } = useQuery({
    queryKey: ['myPtProducts'],
    queryFn: async () => {
      const response = await fetcher<PtDetailResponse>(
        `/ptProduct/trainer/${user.trainerId}`,
        {
          method: 'GET',
          token: false,
        },
      );

      return response;
    },
  });
  const { mutate } = useMutation({
    mutationFn: async ({
      payload,
      checked,
    }: {
      payload: any;
      checked: boolean;
    }) => {
      await fetcher(
        checked
          ? '/classtime'
          : `/classtime?dayOfWeek=${week}&time=${payload.time}`,
        {
          method: checked ? 'POST' : 'DELETE',
          body: checked ? JSON.stringify(payload) : null,
          token: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ptTime'] });
      showToast({
        title: '성공',
        lazy: true,
        description: '스케줄이 등록되었습니다.',
      });
      router.replace('/mypage/pt');
    },
    onError: () => {
      showToast({
        title: '등록 실패',
        lazy: true,
        description: '등록에 실패했습니다.',
        type: 'danger',
      });
    },
  });
  const { data: time } = useQuery({
    queryKey: ['ptTime'],
    queryFn: async () => {
      const response = await fetcher<AvailableResponse | null>(`/classtime`, {
        method: 'GET',
      });

      return response;
    },
  });
  const changeWeekHandler = <T,>(value: T) => {
    setWeek(Number(value));
  };
  const onSchedulePostHandler = (value: number, checked: any) => {
    const payload = {
      dayOfWeek: week,
      time: value,
    };

    mutate({ payload, checked });
  };

  return (
    <div className="flex flex-col gap-10">
      <PtCardSection>
        <div className="flex mb-3 w-full items-center justify-between">
          <h2>나의 PT 스케줄</h2>
          <Button color="primary" onPress={onOpen}>
            스케줄변경
          </Button>
        </div>
        <ScheduleTimeCheckGroup availableTimes={time?.availableTimes} />
      </PtCardSection>
      <div className="w-full flex justify-between">
        <p className="text-large font-bold">나의 PT상품</p>
        <Button
          color="primary"
          onPress={() => router.push('/mypage/pt/registerpt')}
        >
          피티 상품 등록
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {data &&
          data?.ptProducts?.map((item: PtProduct) => (
            <PtProductItem key={item.ptProductId} item={item} />
          ))}
      </div>
      <Drawer
        isOpen={isOpen}
        size="xl"
        title={'스케줄변경'}
        onAction={() => console.log('action')}
        onOpenChange={onOpenChange}
      >
        <div>
          <ScheduleTimeCheckGroup
            availableTimes={initAvailableTimes}
            isReadOnly={false}
            selectedTime={time?.availableTimes}
            setSelectTime={onSchedulePostHandler}
            setSelectedTab={changeWeekHandler}
          />
        </div>
      </Drawer>
    </div>
  );
}
