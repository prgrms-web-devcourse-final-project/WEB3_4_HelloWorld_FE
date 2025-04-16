'use client';

import { Calendar, Card, Chip, RadioGroup, useDisclosure } from '@heroui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
import { useEffect, useState } from 'react';

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
import { getDayOfWeek } from '@/utils/dateUtils';
import Modal from '@/components/atoms/Modal';
import { useAuthStore } from '@/stores/memberTypeStore';
type AvailableResponse = {
  availableTimes?: AvailableTimesType;
  reservationTimes?: AvailableTimesType;
};
type AvailableTimesType = {
  [key: string]: number[];
};
export default function PtReservationPage() {
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [productId, setProductId] = useState<string>('');
  const [disabledTime, setDisabledTime] = useState<number[]>([]);
  const [reservationTime, setReservationTime] = useState<number>(0);
  const { userType } = useAuthStore();
  const [lastMonth, setLastMonth] = useState<number | null>(null);
  const [date, setDate] = useState<string>('null');
  const { onOpen, onOpenChange, isOpen, onClose } = useDisclosure();
  const { showToast } = useToast();
  const router = useRouter();
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
  const { data: trainerTime } = useQuery({
    queryKey: ['ptTrainertime', params.trainerId],
    queryFn: async () => {
      const response = await fetcher<AvailableResponse>(
        `/classtime/${params.trainerId}`,
        {
          method: 'GET',
          token: true,
        },
      );

      return response;
    },
    enabled: !!params.trainerId,
  });
  const onDayChange = (e: CalendarDate) => {
    setDisabledTime([]);
    const { year, day, month } = e;

    const dayOfWeek = getDayOfWeek(year, month, day);
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    if (time?.reservationTimes && time.reservationTimes[dateStr]) {
      setDisabledTime(time.reservationTimes[dateStr]);
    }
    setDate(dateStr);
    setSelectedDate(dayOfWeek);
  };
  const onMonthChange = (date: CalendarDate) => {
    const { year, month, day } = date;

    if (lastMonth !== null && date.month !== lastMonth) {
      mutate({ year, month });
    }

    setLastMonth(date.month);
  };
  const onScheduleSelectHandler = (value: number, checked: any) => {
    setReservationTime(value);
  };
  const onSubmit = () => {
    const payload = {
      date: date,
      time: reservationTime,
      cancelDate: null,
      completedDate: null,
    };

    onSubmitReservaetion({ productId, payload });
  };
  const { mutate: onSubmitReservaetion } = useMutation({
    mutationFn: async ({
      productId,
      payload,
    }: {
      productId: string;
      payload: any;
    }) => {
      const res = await fetcher<AvailableResponse>(
        `/reservation/ptProduct/${productId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      return res;
    },

    onSuccess: () => {
      showToast({
        title: '예약 성공',
        description: '성공',
      });
      router.replace('/pt/complete');
    },
    onError: () => {
      showToast({
        title: '예약 실패',
        description: 'PT 예약에 실패했습니다.',
      });
    },
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
    onError: () => {
      showToast({
        title: '불러오기 실패',
        description: '트레이너 일정 불러오기를 실패했습니다.',
      });
    },
  });

  useEffect(() => {
    const now = today(getLocalTimeZone());
    const { year, month, day } = now;
    const dayOfWeek = getDayOfWeek(year, month, day);
    const dateStr = now.toString();

    setDate(dateStr);
    setSelectedDate(dayOfWeek);
    mutate({ year, month });
  }, [trainerTime]);
  useEffect(() => {
    if (userType && userType !== 'member') {
      showToast({
        title: '일반 유저만 사용 가능합니다',
        description: '예약 기능은 유저만 사용 가능합니다',
        lazy: true,
      });
      router.push('/');
    }
  }, [userType]);
  if (!data) return <p> 정보가 없습니다.</p>;

  return (
    <PtLayout>
      <div className="flex pb-20  gap-8">
        <div className="w-full flex flex-col gap-8">
          <PtCardSection title="헬스장 정보">
            <GymListCardItem gym={data?.gym!} />
          </PtCardSection>
          <PtCardSection title="상품선택">
            <RadioGroup onValueChange={(e) => setProductId(e)}>
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
              onChange={(e) =>
                // onDayChange(e);
                onDayChange(e)
              }
              onFocusChange={(e) => onMonthChange(e)}
            />
          </PtCardSection>
          <PtCardSection>
            <ScheduleTimeCheckGroup
              isDisabled
              availableTimes={
                selectedDate
                  ? {
                      [selectedDate]:
                        trainerTime?.availableTimes?.[selectedDate] ?? [],
                    }
                  : null
              }
              disabledTime={disabledTime}
              isReadOnly={false}
              selectedTime={{ [selectedDate]: [reservationTime] }}
              setSelectTime={onScheduleSelectHandler}
            />
            <div className="w-full pb-3 gap-2 items-center flex justify-end">
              <Chip size="sm" variant="bordered">
                {' '}
              </Chip>{' '}
              <small>마감</small>
            </div>
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

              <MyButton
                isDisabled={!(date && reservationTime && productId)}
                onPress={onOpen}
              >
                예약하기
              </MyButton>
            </Card>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <div className="py-5 px-3 flex flex-col gap-3 items-center">
          <h3 className=" font-semibold text-lg">
            예약날짜 : {date} {reservationTime + ':00'}
          </h3>
          <p>정말로 예약 하시겠습니까?</p>
          <div className=" w-full flex justify-center gap-4">
            <MyButton onPress={onSubmit}>예약하기</MyButton>
            <MyButton color="mono" onPress={onClose}>
              돌아가기
            </MyButton>
          </div>
        </div>
      </Modal>
    </PtLayout>
  );
}
