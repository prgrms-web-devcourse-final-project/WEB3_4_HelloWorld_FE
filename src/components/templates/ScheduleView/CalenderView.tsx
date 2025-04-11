'use client';

import { memo } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/react';

import dayjs from '@/utils/dayjsSetup';
import ScrollContainerBox from '@/components/atoms/ScrollShadowBox';
import { deleteDiaryApi, fetchDiaryListApi } from '@/apis/diaryApi';
import { useCalendarStore } from '@/stores/calendarStore';
import useToast from '@/hooks/useToast';

const CalenderView = () => {
  const { selectedSchedules, setScheduleList, setSchedulesByDate } =
    useCalendarStore();
  const { showToast } = useToast();
  const handleDelete = async (diaryId: number, date: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      // 1. 서버 삭제 요청
      await deleteDiaryApi(diaryId);

      // 2. 최신 리스트 다시 불러오기
      const res: any = await fetchDiaryListApi({ page: 0, size: 31 });
      const list = Array.isArray(res) ? res : (res.data ?? []);

      setScheduleList(list);

      setSchedulesByDate(date);

      showToast({
        title: '삭제 되었습니다',
        description: '삭제가 완료되었습니다.',
        lazy: true,
      });
    } catch {
      showToast({
        title: '삭제 실패',
        description: '다시 시도해주세요.',
        type: 'danger',
        lazy: true,
      });
    }
  };

  return (
    <ScrollContainerBox>
      <div className="flex flex-col gap-6">
        {selectedSchedules.length > 0 ? (
          selectedSchedules.map((schedule, idx) => (
            <div
              key={`${schedule.date}-${idx}`}
              className="relative border-b border-mono-200 pb-4"
            >
              {/* 삭제 버튼 추가*/}
              <Button
                isIconOnly
                className="absolute right-0 top-0 text-mono-400 hover:text-danger"
                size="sm"
                variant="light"
                onClick={() => handleDelete(schedule.id, schedule.date)}
              >
                <TrashIcon className="w-4 h-4" />
              </Button>

              <p className="text-xl font-bold mb-1">
                {dayjs(schedule.date).format('YYYY.MM.DD일 (dd)')}
              </p>
              <p className="bg-[#17c964] inline-block px-2 text-mono-100 rounded-sm text-xs mb-2">
                {schedule.tag ?? '오운했'}
              </p>
              <h3 className="font-bold text-base mb-2">{schedule.title}</h3>
              <p className="text-sm text-mono-500 whitespace-pre-wrap">
                {schedule.description}
              </p>
            </div>
          ))
        ) : (
          <p className="mt-[200px] text-mono-100 text-center">
            일정을 확인 하고 싶은 날짜를 선택해주세요.
          </p>
        )}
      </div>
    </ScrollContainerBox>
  );
};

export default memo(CalenderView);
