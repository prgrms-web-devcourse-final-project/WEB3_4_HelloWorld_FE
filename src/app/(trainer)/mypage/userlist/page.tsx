'use client';

import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import PtCardSection from '@/components/molecules/PT/PtCardSection';
import fetcher from '@/utils/apiInstance';
import Loading from '@/app/loading';
export type Student = {
  studentId: number;
  name: string;
  email: string;
  progress: string;
  memo: string;
  profileUrl: string;
};
export default function UserList() {
  const { data, isLoading } = useQuery({
    queryKey: ['studentList'],
    queryFn: async () =>
      await fetcher<any>('/trainer/student', {
        method: 'GET',
        cache: 'force-cache',
      }),
  });

  useEffect(() => {
    console.log(data);
  }, [data]);
  if (isLoading) return <Loading />;
  if (!data) return <div>데이터가 없습니다.</div>;

  return (
    <div>
      <PtCardSection title="예약 회원 목록">
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>프로필</TableColumn>
            <TableColumn>이름</TableColumn>
            <TableColumn>진행도</TableColumn>
            <TableColumn>메모</TableColumn>
            <TableColumn>예약 내역</TableColumn>
            <TableColumn>예약 내역</TableColumn>
          </TableHeader>
          <TableBody>
            {data &&
              data?.content?.map((item: Student) => (
                <TableRow key={item.studentId}>
                  <TableCell>
                    <Avatar size="md" src={item.profileUrl} />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.progress}</TableCell>
                  <TableCell>{item.memo}</TableCell>
                </TableRow>
              ))}
            {data?.content?.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} style={{ textAlign: 'center' }}>
                  회원이 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </PtCardSection>
    </div>
  );
}
