'use client';

import type { CommonHistory } from '@/utils/convertReservationToHistory';

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from '@nextui-org/react';
import { useMemo, useState } from 'react';
import { useDisclosure } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Modal from '@/components/atoms/Modal';
import { MyButton } from '@/components/atoms/Button';
import PtReservationForm from '@/components/templates/PtTemplate/PtReservationForm';
import fetcher from '@/utils/apiInstance';
import useToast from '@/hooks/useToast';

interface Props {
  data: CommonHistory[];
}
const LessonHistoryTableRaw = ({ data }: Props) => {
  const [page, setPage] = useState(1);
  const [reservationData, setReservationData] = useState<CommonHistory>();
  const rowsPerPage = 8;
  const queryClient = useQueryClient();
  const pages = Math.ceil(data.length / rowsPerPage);
  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const { showToast } = useToast();
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);
  const { mutate } = useMutation({
    mutationFn: async (reservationId: number) => {
      return await fetcher(`/reservation/${reservationId}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['mypage', 'user'],
      });
      showToast({
        title: '예약 취소 성공',
        description: '정상적으로 예약이 취소되었습니다.',
      });
    },
    onError: () => {
      showToast({
        title: '예약 취소 실패',
        description: '예약 취소를 실패했습니다.',
      });
    },
  });

  return (
    <div>
      <Modal
        isOpen={isOpen}
        scrollBehavior="outside"
        size="2xl"
        onOpenChange={onOpenChange}
      >
        <div className="px-8 py-6">
          <PtReservationForm reservationData={reservationData} />
        </div>
      </Modal>
      <Table
        aria-label="Lesson history table (raw)"
        bottomContent={
          <div className="flex w-full justify-center mt-12">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={setPage}
            />
          </div>
        }
        classNames={{
          wrapper: 'min-w-[1305px] min-h-[550px]',
        }}
      >
        <TableHeader>
          <TableColumn key="status" className="w-[100px]">
            구분
          </TableColumn>
          <TableColumn key="time" className="w-[170px]">
            시간
          </TableColumn>
          <TableColumn key="content" className="w-[440px]">
            내용
          </TableColumn>
          <TableColumn key="seller" className="w-[120px]">
            판매자
          </TableColumn>
          <TableColumn key="price" className="w-[120px]">
            금액
          </TableColumn>
          <TableColumn key="cancel" className="w-[120px]">
            취소일자
          </TableColumn>
          <TableColumn key="info" className="w-[120px]">
            비고
          </TableColumn>
        </TableHeader>

        <TableBody
          className="py-6"
          emptyContent={
            <div className="text-center text-gray-500">
              수강 내역이 없습니다.
            </div>
          }
          items={items}
        >
          {(item) => {
            const status = item.status;
            const time = item.time;
            const seller = item.seller;

            return (
              <TableRow key={item.id} className="py-6 min-h-[20px]">
                <TableCell>{status}</TableCell>
                <TableCell>{time}</TableCell>
                <TableCell>{item.content}</TableCell>
                <TableCell>{seller}</TableCell>
                <TableCell
                  className={
                    status === '만료' ? 'text-primary' : 'text-success'
                  }
                >
                  {item.price.toLocaleString()}
                </TableCell>
                <TableCell>{item.cancelDate}</TableCell>
                <TableCell>
                  {!item.cancelDate ? (
                    <div className="flex gap-2">
                      <MyButton
                        size="xs"
                        onPress={() => mutate(item.reservationId)}
                      >
                        예약취소
                      </MyButton>
                      <MyButton
                        color="warning"
                        size="xs"
                        onPress={() => {
                          setReservationData(item);
                          onOpen();
                        }}
                      >
                        예약 변경
                      </MyButton>
                    </div>
                  ) : (
                    ''
                  )}
                </TableCell>
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
    </div>
  );
};

export default LessonHistoryTableRaw;
