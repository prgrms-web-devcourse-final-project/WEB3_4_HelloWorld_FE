'use client';

import {
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
export type Reservation = {
  reservationId: number;
  productName: string;
  date: string;
  time: number;
  price: number;
  cancelDate: string;
  completedDate: string;
  trainerId: number;
};
export default function ReservationList() {
  const { data, isLoading } = useQuery({
    queryKey: ['reservationList'],
    queryFn: async () =>
      await fetcher<any>('/reservation/trainer', {
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
      <PtCardSection title="예약 목록">
        <Table aria-label="Example static collection table">
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
              data?.content?.map((item: Reservation) => (
                <TableRow key={item.reservationId}>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.time}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.cancelDate}</TableCell>
                  <TableCell>{item.completedDate}</TableCell>
                </TableRow>
              ))}
            {data?.content?.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} style={{ textAlign: 'center' }}>
                  예약 내역이 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </PtCardSection>
    </div>
  );
}
