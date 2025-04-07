'use client';

import LessonHistoryTable from '@/components/molecules/Table';
import { LESSON_HISTORY_MOCK } from '@/components/templates/MemberMypageTemplate/contents/lessonHistoryList';

export default function HistoryList() {
  return (
    <div className="w-full flex flex-col items-start mb-[300px]">
      <h1 className="font-point text-2xl font-bold mb-2">나의 수강 내역</h1>
      <p className="text-mono_500 text-sm mb-5">
        내가 관리 중인 웹사이트의 사용자가 GymMate웹을 결제하면, 부가가치세를
        제외한 <p className="inline text-blue-500">이용 요금의 10%</p>가
        차감되고 표시 됩니다 .
      </p>
      <div className="w-[1305px] h-[550px] mb-[300px] py-4">
        <LessonHistoryTable data={LESSON_HISTORY_MOCK} />
      </div>
    </div>
  );
}
