import { Image } from '@heroui/react';

import LevelBadge from '@/components/atoms/LevelBadge';
import { StudentResponse } from '@/types/student';
import { formatKg } from '@/utils/bigThree';
type Props = {
  student?: StudentResponse;
};
export default function StudentCard({ student }: Props) {
  return (
    <div className=" px-4 py-3 ">
      <div className="flex items-start  gap-4">
        <Image
          alt="profile"
          className="object-cover aspect-square"
          src={
            student?.profileUrl ||
            'https://image.xportsnews.com/contents/images/upload/article/2017/0619/1497836487547559.jpg'
          }
          width={250}
        />
        <div className="flex flex-col w-full gap-2">
          <div className="flex gap-2 items-center">
            <LevelBadge level={4} />
            <p className=" text-large">
              <span className="font-bold">{student?.name}</span>
              <span> {student?.gender === 'MALE' ? '남' : '여'}</span>
            </p>
          </div>
          <div className=" flex gap-2">
            <span> 신장 :{student?.height}cm</span>
            <span> 몸무게 :{student?.weight}kg</span>
          </div>

          <div className="text-mono_400 w-full text-small text-start flex gap-4 font-light">
            <div className=" w-full ">
              <p className="font-semibold">벤치 프레스</p>
              <span> {formatKg(student?.bench || 0)}</span>
            </div>

            <div className=" w-full ">
              <p className="font-semibold">스쿼트</p>
              <span> {formatKg(student?.squat || 0)}</span>
            </div>
            <div className=" w-full ">
              <p className="font-semibold">데드리프트</p>
              <span> {formatKg(student?.deadlift || 0)}</span>
            </div>
          </div>
          <p className="text-mono_600 p-2 bg-mono_100 text-sm rounded-lg w-full ">
            {student?.memo ?? '소개글이 아직 없습니다.'}
          </p>
        </div>
      </div>
    </div>
  );
}
