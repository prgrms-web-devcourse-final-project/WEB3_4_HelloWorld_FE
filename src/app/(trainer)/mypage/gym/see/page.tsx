'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, TimeInput } from '@heroui/react';

import { FacilityButton } from '@/components/atoms/FacilityButton';
import { CustomTextarea } from '@/components/atoms/TextareaBase';
import { myGymList } from '@/apis/gymApi';

const facilityIcons: Record<string, string> = {
  parking: '/gym/icons/parking.svg',
  showerRoom: '/gym/icons/shower.svg',
  inBody: '/gym/icons/inbody.svg',
  locker: '/gym/icons/locker.svg',
  wifi: '/gym/icons/wifi.svg',
  sportsWear: '/gym/icons/cloth.svg',
  towel: '/gym/icons/towel.svg',
  sauna: '/gym/icons/sauna.svg',
};

const facilityLabels: Record<string, string> = {
  parking: '주차장',
  showerRoom: '샤워실',
  inBody: '인바디',
  locker: '개인락커',
  wifi: '와이파이',
  sportsWear: '운동복',
  towel: '수건',
  sauna: '사우나',
};

const parseTimeStringToDate = (timeStr: string): Date => {
  const [h, m] = timeStr.split(':');

  return new Date(`1970-01-01T${h}:${m}:00`);
};

const formatDateToTimeString = (date: Date): string => {
  return date.toTimeString().slice(0, 8);
};

export default function GymEditPage() {
  const [gymList, setGymList] = useState<any[]>([]);
  const [selectedGym, setSelectedGym] = useState<any | null>(null);
  const [editMode, setEditMode] = useState(false);

  const [editedIntro, setEditedIntro] = useState('');
  const [editedStartTime, setEditedStartTime] = useState<Date | null>(null);
  const [editedEndTime, setEditedEndTime] = useState<Date | null>(null);
  const [editedFacilities, setEditedFacilities] = useState<
    Record<string, boolean>
  >({
    parking: false,
    showerRoom: false,
    inBody: false,
    locker: false,
    wifi: false,
    sportsWear: false,
    towel: false,
    sauna: false,
  });

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const result = await myGymList();

        if (result && typeof result === 'object') {
          const gymArray = Array.isArray(result) ? result : [result];
          const firstGym = gymArray[0];

          setGymList(gymArray);
          setSelectedGym(firstGym);
          setEditedIntro(firstGym.gymInfo.intro);
          setEditedStartTime(parseTimeStringToDate(firstGym.gymInfo.startTime));
          setEditedEndTime(parseTimeStringToDate(firstGym.gymInfo.endTime));
          setEditedFacilities(firstGym.gymInfo.facility);
        }
      } catch (err) {
        console.error('헬스장 목록 로딩 실패:', err);
      }
    };

    fetchGyms();
  }, []);

  const toggleFacility = (key: string) => {
    setEditedFacilities((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    console.log('저장 내용:', {
      intro: editedIntro,
      startTime: editedStartTime ? formatDateToTimeString(editedStartTime) : '',
      endTime: editedEndTime ? formatDateToTimeString(editedEndTime) : '',
      facilities: editedFacilities,
    });
    setEditMode(false);
  };

  if (!selectedGym) return <div className="p-4">등록된 헬스장이 없습니다.</div>;

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold">헬스장 정보</h1>

      <form
        className="space-y-8"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <section className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">기본 정보</h2>

          <label className="block text-sm font-medium mb-1">소개</label>
          {editMode ? (
            <CustomTextarea
              value={editedIntro}
              onChange={(e) => setEditedIntro(e.target.value)}
            />
          ) : (
            <p className="text-gray-600">{selectedGym.gymInfo.intro}</p>
          )}

          <div className="flex gap-4 mt-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                운영 시작
              </label>
              {editMode ? (
                <TimeInput
                  className="w-full"
                  value={editedStartTime}
                  onChange={setEditedStartTime}
                />
              ) : (
                <p className="text-gray-600">{selectedGym.gymInfo.startTime}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                운영 종료
              </label>
              {editMode ? (
                <TimeInput
                  className="w-full"
                  value={editedEndTime}
                  onChange={setEditedEndTime}
                />
              ) : (
                <p className="text-gray-600">{selectedGym.gymInfo.endTime}</p>
              )}
            </div>
          </div>
        </section>

        <section className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">편의시설</h2>
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(facilityIcons).map(([key, icon]) => (
              <FacilityButton
                key={key}
                disabled={!editMode}
                icon={icon}
                label={facilityLabels[key]}
                selected={editedFacilities[key]}
                onClick={() => editMode && toggleFacility(key)}
              />
            ))}
          </div>
        </section>

        <section className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">이용 요금</h2>
          {selectedGym.gymProducts.map((p) => (
            <div key={p.gymProductId} className="bg-blue-50 p-4 rounded mb-2">
              <div>이용 기간: {p.gymProductMonth}개월</div>
              <div>요금: {p.gymProductFee.toLocaleString()}원</div>
            </div>
          ))}
        </section>

        <section className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">시설 사진</h2>
          <div className="grid grid-cols-3 gap-4">
            {selectedGym.images.map((img) => (
              <div
                key={img.imageId}
                className="aspect-video relative rounded overflow-hidden"
              >
                <Image
                  fill
                  alt="헬스장 이미지"
                  className="object-cover"
                  src={img.url}
                />
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-center gap-4">
          {editMode ? (
            <>
              <Button color="primary" type="submit">
                저장하기
              </Button>
              <Button color="default" onClick={() => setEditMode(false)}>
                취소
              </Button>
            </>
          ) : (
            <Button color="primary" onClick={() => setEditMode(true)}>
              수정하기
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
