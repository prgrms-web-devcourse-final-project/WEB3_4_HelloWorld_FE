import { useState } from 'react';
import { Button } from '@heroui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface GymIntroSectionProps {
  content: string;
}

export default function GymIntroSection({ content }: GymIntroSectionProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {/* 센터 소개 제목 */}
      <h4 className="text-[16px] font-semibold font-pretendard text-mono_800">
        센터 소개
      </h4>

      {/* 내용 박스 */}
      <div
        className={`
    w-[400px]
    ${expanded ? 'max-h-fit' : 'max-h-[168px]'}
    overflow-hidden
    text-[16px] font-pretendard text-mono_600
    whitespace-pre-wrap
    transition-all duration-300
    rounded-xl
    border border-mono_100 shadow-sm
    p-3
    bg-white
  `}
      >
        {content}
      </div>

      {/* 더보기 / 줄이기 버튼 */}
      {content.length > 100 && (
        <Button
          className="
            w-[400px] h-[32px]
            bg-mono_100 hover:bg-mono_300
            flex justify-center items-center
            rounded-md
            transition
          "
          radius="sm"
          size="sm"
          variant="light"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <ChevronUpIcon className="w-5 h-5 text-mono_600" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-mono_600" />
          )}
        </Button>
      )}
    </div>
  );
}
