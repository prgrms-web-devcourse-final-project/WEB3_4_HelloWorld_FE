'use client';

import {
  Avatar,
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
import useToast from '@/hooks/useToast';
import StudentCard from '@/components/molecules/TrainerMypage/StudentCard';
import useStudentMutation from '@/hooks/useStudentMutation';
export type Student = {
  studentId: number;
  name: string;
  email: string;
  progress: string;
  memo: string;
  profileUrl: string;
};
export default function UserList() {
  const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure();
  const { showToast } = useToast();
  const { data, isLoading } = useQuery({
    queryKey: ['studentList'],
    queryFn: async () =>
      await fetcher<any>('/trainer/student', {
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
      <PtCardSection title="예약 회원 목록">
        <Table
          aria-label="Example static collection table"
          selectionMode="single"
          onRowAction={(e) => onModalHandelr(e)}
        >
          <TableHeader>
            <TableColumn width={100}>프로필</TableColumn>
            <TableColumn>이름</TableColumn>
            <TableColumn>진행도</TableColumn>
            <TableColumn>메모</TableColumn>
          </TableHeader>
          <TableBody>
            {data &&
              data?.content?.map((item: Student) => (
                <TableRow key={item.studentId}>
                  <TableCell>
                    <Avatar size="md" src={item.profileUrl} />
                  </TableCell>
                  <TableCell>{item.name || ''}</TableCell>
                  <TableCell>{item.progress || '미진행'}</TableCell>
                  <TableCell>{item.memo || '내용없음'}</TableCell>
                </TableRow>
              ))}
            {data?.content?.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                  회원이 없습니다.
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
bench: 234;
deadlift: 234;
gender: 'MALE';
height: '240';
level: 4;
memo: null;
name: '이희수';
profileUrl: null;
progress: null;
squat: 424;
weight: '60';
