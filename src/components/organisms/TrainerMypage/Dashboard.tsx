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

import GymListCardItem from '@/components/molecules/GYM/GymListCardItem';
import NumberCountCard from '@/components/molecules/NumberCountCard';
import DashboardItemWrap from '@/components/molecules/TrainerMypage/DashboardItemWrap';
import LevelBadge from '@/components/atoms/LevelBadge';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="col-span-2 p-2">
        <CardBody>
          <div className="flex justify-between">
            <div className="flex gap-4">
              <Image
                alt="profile"
                className="object-cover aspect-square"
                src="https://image.xportsnews.com/contents/images/upload/article/2017/0619/1497836487547559.jpg"
                width={200}
              />
              <div className="flex flex-col gap-2">
                <p className="text-sm text-main font-semibold">사장</p>
                <div className="flex gap-2 items-center">
                  <LevelBadge level={4} />
                  <p className=" text-large">
                    <span className="font-bold">이희수</span>님 안녕하세요
                  </p>
                </div>
                <div className="text-mono_400 text-small font-light">
                  <p>960213/남</p>
                  <p>국민은행:942902-00-238314</p>
                </div>
              </div>
            </div>
            <div className="">
              <Button isIconOnly variant="light">
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
