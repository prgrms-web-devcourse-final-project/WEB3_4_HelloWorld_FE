'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from '@heroui/react';
import { useQuery } from '@tanstack/react-query';

import PtCardSection from '@/components/molecules/PT/PtCardSection';
import fetcher from '@/utils/apiInstance';
import Loading from '@/app/loading';
import Modal from '@/components/atoms/Modal';
import StudentCard from '@/components/molecules/TrainerMypage/StudentCard';
import useStudentMutation from '@/hooks/useStudentMutation';
import { formatCash } from '@/utils/formatter';
export type Reservation = {
  reservationId: number;
  productName: string;
  date: string;
  time: number;
  price: number;
  cancelDate: string;
  completedDate: string;
  trainerId: number;
  studentId: number;
};
export default function ReservationList() {
  const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure();

  const { data, isLoading } = useQuery({
    queryKey: ['reservation', 'member'],
    queryFn: async () =>
      await fetcher<any>('/reservation/trainer', {
        method: 'GET',
        cache: 'force-cache',
      }),
  });
  const { mutate: fetchStudent, data: student } = useStudentMutation(() =>
    onOpen(),
  );

  const onModalHandelr = (e: React.Key) => {
    fetchStudent(String(e));
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <PtCardSection title="예약 목록">
        <Table
          aria-label="Example static collection table"
          selectionMode="single"
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
              data?.content?.map((item: Reservation) => (
                <TableRow
                  key={item.reservationId || ''}
                  onClick={(e) => onModalHandelr(item.studentId)}
                >
                  <TableCell>{item.productName || ''}</TableCell>
                  <TableCell>{item.time + ':00' || ''}</TableCell>
                  <TableCell>{formatCash(item.price) + '원' || ''}</TableCell>
                  <TableCell>{item.date || ''}</TableCell>
                  <TableCell>{item.cancelDate || ''}</TableCell>
                  <TableCell>{item.completedDate || ''}</TableCell>
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
      <Modal isOpen={isOpen} size="xl" onOpenChange={onOpenChange}>
        <StudentCard student={student} />
      </Modal>
    </div>
  );
}
