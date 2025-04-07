'use client';

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

interface CommonHistory {
  id: string;
  status: string;
  time: string;
  content: string;
  seller: string;
  price: number;
  period?: string;
}

interface Props<T = CommonHistory> {
  data: T[];
}

const LessonHistoryTable = <T extends CommonHistory>({ data }: Props<T>) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;
  const pages = Math.ceil(data.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  return (
    <Table
      aria-label="Lesson history table"
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
      </TableHeader>

      <TableBody
        className="py-6"
        emptyContent={
          <div className="text-center text-gray-500">결제 내역이 없습니다.</div>
        }
        items={items}
      >
        {(item) => (
          <TableRow key={item.id} className="py-6 min-h-[20px]">
            <TableCell>{item.status}</TableCell>
            <TableCell>{item.time}</TableCell>
            <TableCell>{item.content}</TableCell>
            <TableCell>{item.seller}</TableCell>
            <TableCell
              className={
                item.status === '만료' ? 'text-primary' : 'text-success'
              }
            >
              {item.price.toLocaleString()}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default LessonHistoryTable;
