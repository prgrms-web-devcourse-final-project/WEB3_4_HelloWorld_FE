'use client';

import { Calendar, Chip, RadioGroup, useDisclosure } from '@heroui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
import { useEffect, useState } from 'react';

import { MyButton } from '@/components/atoms/Button';
import PtCardSection from '@/components/molecules/PT/PtCardSection';
import ScheduleTimeCheckGroup from '@/components/organisms/ScheduleTimeCheckGroup';
import fetcher from '@/utils/apiInstance';
import { PtDetailResponse } from '@/types/pt.types';
import { PtPlanGroup } from '@/components/molecules/PT/PtPlanGroup';
import useToast from '@/hooks/useToast';
import { formatCash } from '@/utils/formatter';
import { getDayOfWeek } from '@/utils/dateUtils';
interface Props {
  reservationData: any;
}
type AvailableResponse = {
  availableTimes?: AvailableTimesType;
  reservationTimes?: AvailableTimesType;
};

type AvailableTimesType = {
  [key: string]: number[];
};

export default function PtReservationForm({ reservationData }: Props) {
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [productId, setProductId] = useState<string>('');
  const [disabledTime, setDisabledTime] = useState<number[]>([]);
  const [reservationTime, setReservationTime] = useState<number>(0);
  const [lastMonth, setLastMonth] = useState<number | null>(null);
  const [date, setDate] = useState<string>('null');
  const { onOpen, onOpenChange, isOpen, onClose } = useDisclosure();
  const { showToast } = useToast();
  const params = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['ptProductDetail', params.trainerId],
    queryFn: async () => {
      const response = await fetcher<PtDetailResponse>(
        `/ptProduct/trainer/${reservationData.trainerId}`,
        {
          method: 'GET',
          token: false,
        },
      );

      return response;
    },
    enabled: !!reservationData.trainerId,
  });

  const { data: trainerTime } = useQuery({
    queryKey: ['ptTrainertime', reservationData.trainerId],
    queryFn: async () => {
      const response = await fetcher<AvailableResponse>(
        `/classtime/${reservationData.trainerId}`,
        {
          method: 'GET',
          token: true,
        },
      );

      return response;
    },
    enabled: !!reservationData.trainerId,
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
    const { year, month } = date;

    if (lastMonth !== null && date.month !== lastMonth) {
      mutate({ year, month });
    }
    setLastMonth(date.month);
  };

  const onScheduleSelectHandler = (value: number) => {
    setReservationTime(value);
  };

  const onSubmit = () => {
    const payload = {
      date: date,
      time: reservationTime,
      cancelDate: null,
      completedDate: null,
    };

    onSubmitReservation({ productId, payload });
  };

  const { mutate: onSubmitReservation } = useMutation({
    mutationFn: async ({ payload }: { productId: string; payload: any }) => {
      return await fetcher(`/reservation/${reservationData.reservationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      showToast({ title: '예약 변경 성공', description: '성공' });
      onClose();
    },
    onError: () => {
      showToast({
        title: '예약 변경 실패',
        description: 'PT 예약 변경에 실패했습니다.',
      });
    },
  });

  const { mutate, data: time } = useMutation({
    mutationFn: async ({ year, month }: { year: number; month: number }) => {
      return await fetcher<AvailableResponse>(
        `/reservation/trainer/${reservationData?.trainerId}/month?year=${year}&month=${month}`,
        { method: 'GET' },
      );
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
  }, [trainerTime, reservationData]);

  return (
    <div>
      <div className="flex  gap-8">
        <div className="w-full flex flex-col gap-8">
          <PtCardSection title="상품선택">
            <RadioGroup onValueChange={(e) => setProductId(e)}>
              {data?.ptProducts?.map((item, index) => (
                <PtPlanGroup
                  key={index}
                  description={formatCash(item.fee) + '원'}
                  imageSrc={item.images[0]}
                  value={String(item.ptProductId)}
                >
                  <p className="text-lg font-semibold">{item.productName}</p>
                  <div className="text-mono_500">{item.ptInfo}</div>
                </PtPlanGroup>
              ))}
            </RadioGroup>
          </PtCardSection>

          <PtCardSection>
            <Calendar
              aria-label="날짜 선택"
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
              onChange={onDayChange}
              onFocusChange={onMonthChange}
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
              </Chip>
              <small>마감</small>
            </div>
          </PtCardSection>
          <MyButton onPress={() => onSubmit()}>예약변경</MyButton>
        </div>
      </div>
    </div>
  );
}
