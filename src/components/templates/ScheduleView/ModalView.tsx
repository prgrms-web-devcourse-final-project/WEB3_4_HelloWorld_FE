'use client';

import { FormEvent, useState } from 'react';

import dayjs from '@/utils/dayjsSetup';
import { postDiaryApi } from '@/apis/diaryApi';
import { useCalendarStore } from '@/stores/calendarStore';
import { fetchDiaryListApi } from '@/apis/diaryApi';
import { CustomTextarea } from '@/components/atoms/TextareaBase';
import Modal from '@/components/atoms/Modal';
import CustomButton from '@/app/(main)/login/components/CustomButton';
import InputField from '@/app/(main)/login/components/InputField';
import useToast from '@/hooks/useToast';

interface ModalViewProps {
  isOpen: boolean;
  onClose: () => void;
  scheduleDate: string;
}

const ModalView = ({ isOpen, onClose, scheduleDate }: ModalViewProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const { setScheduleList } = useCalendarStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await postDiaryApi({
        date: scheduleDate,
        diaryRequest: {
          title,
          content,
        },
      });

      const res: any = await fetchDiaryListApi({ page: 0, size: 31 });
      const list = Array.isArray(res) ? res : (res.data ?? []);

      setScheduleList(list);

      showToast({
        title: '등록 완료',
        description: '등록이 완료되었습니다.',
        lazy: true,
      });

      onClose();
    } catch {
      showToast({
        title: '등록 실패',
        description: '다시 시도해주세요.',
        type: 'danger',
        lazy: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} size="2xl" onOpenChange={onClose}>
      <form
        className="w-[660px] max-w-[90vw] min-h-[500px] mx-auto flex flex-col justify-between"
        onSubmit={handleSubmit}
      >
        <div className="px-6 pt-6">
          <h2 className="text-2xl font-point font-extrabold">
            {dayjs(scheduleDate).format('MM월 DD일')} 오운했 등록
          </h2>
        </div>

        <div className="flex flex-col gap-6 p-6 flex-grow">
          <InputField
            height="40px"
            label="어떤 운동을 하셨나요?"
            name="title"
            placeholder="잠자기"
            value={title}
            width="full"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">고생한 나에게 한마디</p>
            <CustomTextarea
              className="w-full h-[180px]"
              placeholder="고생한 나에게 한마디를 입력해주세요"
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>

        <div className="px-6 pb-6">
          <CustomButton height="40px" type="submit" width="610px">
            {loading ? '등록 중...' : '등록하기'}
          </CustomButton>
        </div>
      </form>
    </Modal>
  );
};

export default ModalView;
