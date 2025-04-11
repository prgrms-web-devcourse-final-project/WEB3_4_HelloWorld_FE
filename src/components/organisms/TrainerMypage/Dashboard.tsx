'use client';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
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

import GymListCardItem from '@/components/molecules/GYM/GymListCardItem';
import NumberCountCard from '@/components/molecules/NumberCountCard';
import DashboardItemWrap from '@/components/molecules/TrainerMypage/DashboardItemWrap';
import LevelBadge from '@/components/atoms/LevelBadge';
import { useAuthStore } from '@/stores/memberTypeStore';

export default function Dashboard() {
  const router = useRouter();
  const trainerInfo = useAuthStore((state) => state.user);

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="col-span-2 p-2">
        <CardBody>
          <div className="flex justify-between">
            <div className="flex gap-4">
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
          <GymListCardItem />
        </div>
      </DashboardItemWrap>
      <DashboardItemWrap date="2025.01.01" title="회원 수">
        <div className="flex gap-4" />
      </DashboardItemWrap>
      <DashboardItemWrap title="회원 수">
        <div className="flex gap-4" />
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
      <Card className="col-span-3">
        <CardHeader>
          <Table aria-label="Example static collection table" shadow="none">
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>ROLE</TableColumn>
              <TableColumn>STATUS</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>Tony Reichert</TableCell>
                <TableCell>CEO</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>Zoey Lang</TableCell>
                <TableCell>Technical Lead</TableCell>
                <TableCell>Paused</TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell>Jane Fisher</TableCell>
                <TableCell>Senior Developer</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow key="4">
                <TableCell>William Howard</TableCell>
                <TableCell>Community Manager</TableCell>
                <TableCell>Vacation</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardHeader>
      </Card>
    </div>
  );
}
