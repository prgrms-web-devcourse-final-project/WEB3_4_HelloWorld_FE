'use client';

import {
  Button,
  Card,
  CardBody,
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import ScheduleTimeCheckGroup from '../ScheduleTimeCheckGroup';

import GymListCardItem from '@/components/molecules/GYM/GymListCardItem';
import NumberCountCard from '@/components/molecules/NumberCountCard';
import DashboardItemWrap from '@/components/molecules/TrainerMypage/DashboardItemWrap';
import LevelBadge from '@/components/atoms/LevelBadge';
import { useAuthStore } from '@/stores/memberTypeStore';
import fetcher from '@/utils/apiInstance';
import { PtDetailResponse } from '@/types/pt.types';
import { formatCash } from '@/utils/formatter';
import { Reservation } from '@/app/(trainer)/mypage/reservation/page';
type AvailableResponse = {
  availableTimes: AvailableTimesType;
};
type AvailableTimesType = {
  [key: string]: number[];
};
export default function Dashboard() {
  const router = useRouter();
  const trainerInfo = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData(['ptTime']);
  const { user } = useAuthStore();
  const { data: time } = useQuery({
    queryKey: ['ptTime'],
    queryFn: async () => {
      const response = await fetcher<AvailableResponse | null>(`/classtime`, {
        method: 'GET',
      });

      return response;
    },
    enabled: !cachedData,
  });
  const { data: reservation } = useQuery({
    queryKey: ['reservation', 'member'],
    queryFn: async () =>
      await fetcher<any>('/reservation/trainer', {
        method: 'GET',
        cache: 'force-cache',
      }),
  });
  const { data, isLoading, isError } = useQuery({
    queryKey: ['ptProductDetail'],
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
    enabled: user !== null,
  });

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="col-span-2 p-2">
        <CardBody>
          <div className="flex justify-between">
            <div className="flex  gap-4">
              <Image
                alt="profile"
                className="object-cover aspect-square"
                src={
                  trainerInfo?.profile ||
                  'https://image.xportsnews.com/contents/images/upload/article/2017/0619/1497836487547559.jpg'
                }
                width={200}
              />
              <div className="flex flex-col gap-2">
                <p className="text-sm text-main font-semibold">
                  {trainerInfo?.isOwner ? '사장' : '트레이너'}
                </p>
                <div className="flex gap-2 items-center">
                  <LevelBadge level={4} />
                  <p className=" text-large">
                    <span className="font-bold">
                      {trainerInfo?.trainerName}
                    </span>
                    님 안녕하세요
                  </p>
                </div>
                <div className="text-mono_400 text-small font-light">
                  <p> {trainerInfo?.gender === 'MALE' ? '남' : '여'}</p>
                  <p>{`${trainerInfo?.bank} : ${trainerInfo?.account}`}</p>
                </div>
                <p className="text-mono_600 line-clamp-3">
                  {trainerInfo?.intro ?? '소개글이 아직 없습니다.'}
                </p>
              </div>
            </div>
            <div className="">
              <Button
                isIconOnly
                variant="light"
                onPress={() => router.push('/mypage/edit')}
              >
                <PencilSquareIcon className="text-mono_300 h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
      <DashboardItemWrap title="소속 헬스장">
        <div className="flex gap-4">
          <GymListCardItem gym={data?.gym!} />
        </div>
      </DashboardItemWrap>
      <DashboardItemWrap date="변경하기" title="나의 스케줄">
        <ScheduleTimeCheckGroup availableTimes={time?.availableTimes} />
      </DashboardItemWrap>
      <DashboardItemWrap title="내 PT 상품">
        <div className="w-full flex flex-col gap-2">
          {data &&
            data.ptProducts?.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className=" bg-mono_050 w-full flex gap-3 rounded-lg items-center justify-start p-3"
              >
                <div>
                  <Image
                    className="aspect-square object-cover"
                    src={item.images[0] || '/gym/icons/healthboy.jpg'}
                    width={80}
                  />
                </div>
                <div className="w-full text-small text-mono_300">
                  <h4 className="text-medium text-mono_600 font-bold">
                    {item.productName}
                  </h4>
                  <p>{item.ptInfo}</p>
                  <span>{formatCash(item.fee) + '원'}</span>
                </div>
              </div>
            ))}
        </div>
        {!data && (
          <p className="w-full h-full text-center py-3">PT 상품이 없습니다.</p>
        )}
      </DashboardItemWrap>
      <DashboardItemWrap date="2025.01.01" title="회원 수">
        <div className="flex gap-4">
          <NumberCountCard
            fillColor
            fullWidth
            countNumber={100}
            title={'회원 수'}
          />
          <NumberCountCard
            fillColor
            fullWidth
            countNumber={100}
            title={'회원 수'}
          />
        </div>
      </DashboardItemWrap>
      <div className="col-span-3">
        <DashboardItemWrap title="예약 목록">
          <Table
            aria-label="Example static collection table"
            selectionMode="single"
            shadow="none"
          >
            <TableHeader>
              <TableColumn>상품명</TableColumn>
              <TableColumn>시간</TableColumn>
              <TableColumn>금액</TableColumn>
              <TableColumn>예약일</TableColumn>
              <TableColumn>예약취소일자</TableColumn>
              <TableColumn>상태</TableColumn>
            </TableHeader>
            <TableBody>
              {data &&
                reservation?.content?.map((item: Reservation) => (
                  <TableRow key={item.reservationId || ''}>
                    <TableCell>{item.productName || ''}</TableCell>
                    <TableCell>{item.time + ':00' || ''}</TableCell>
                    <TableCell>{formatCash(item.price) + '원' || ''}</TableCell>
                    <TableCell>{item.date || ''}</TableCell>
                    <TableCell>{item.cancelDate || ''}</TableCell>
                    <TableCell>{item.completedDate || ''}</TableCell>
                  </TableRow>
                ))}
              {reservation?.content?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: 'center' }}>
                    예약 내역이 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DashboardItemWrap>
      </div>
    </div>
  );
}
