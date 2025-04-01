'use client';

import { useState } from 'react';
import {
  Autocomplete,
  AutocompleteItem,
  Textarea,
  NumberInput,
  Button,
  Input,
  Card,
  CardBody,
  CardFooter,
} from '@heroui/react';
import { StarIcon, MapPinIcon, TrashIcon } from '@heroicons/react/24/solid';

const gyms = [
  {
    label: '비헬씨 서초점',
    key: 'gym1',
    location: '서울시 강남구 역삼동',
    rating: 4.66,
  },
  {
    label: '머슬팩토리',
    key: 'gym2',
    location: '서울시 강남구 강남대로',
    rating: 4.5,
  },
  {
    label: '강남 피트니스',
    key: 'gym3',
    location: '서울시 강남구 테헤란로',
    rating: 4.7,
  },
  {
    label: '스파르탄짐',
    key: 'gym4',
    location: '서울시 서초구 반포동',
    rating: 4.4,
  },
  {
    label: '아이언짐',
    key: 'gym5',
    location: '서울시 강남구 논현동',
    rating: 4.55,
  },
];

const allFacilities = [
  '수건',
  '샤워실',
  '주차장',
  '사우나',
  '개인락커',
  '운동복',
  '와이파이',
  '인바디',
];

const facilityIcons: Record<string, string> = {
  수건: '/gym/icons/towel.svg',
  샤워실: '/gym/icons/shower.svg',
  주차장: '/gym/icons/parking.svg',
  사우나: '/gym/icons/sauna.svg',
  개인락커: '/gym/icons/locker.svg',
  운동복: '/gym/icons/cloth.svg',
  와이파이: '/gym/icons/wifi.svg',
  인바디: '/gym/icons/inbody.svg',
};

export default function GymEditPage() {
  const [selectedGym, setSelectedGym] = useState<any>(null);

  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentCount, setEquipmentCount] = useState<number | null>(null);
  const [equipments, setEquipments] = useState<
    { name: string; count: number }[]
  >([]);

  const addEquipment = () => {
    if (!equipmentName || !equipmentCount || equipmentCount <= 0) return;
    setEquipments([
      ...equipments,
      { name: equipmentName, count: equipmentCount },
    ]);
    setEquipmentName('');
    setEquipmentCount(null);
  };

  const removeEquipment = (name: string) => {
    setEquipments((prev) => prev.filter((eq) => eq.name !== name));
  };

  const toggleFacility = (facility: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility],
    );
  };

  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...newImages]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 top-[64px] h-[calc(100vh-64px)] w-full flex overflow-hidden">
      <div className="w-[200px] bg-mono_200 flex-shrink-0" />
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-[3] p-[60px] space-y-10 overflow-auto">
          {/* 헬스장 검색 */}
          <div className="max-w-md">
            <Autocomplete
              defaultItems={gyms}
              label="헬스장 이름 검색"
              placeholder="헬스장 이름으로 검색하세요"
              selectedKey={selectedGym?.key}
              onSelectionChange={(key) =>
                setSelectedGym(gyms.find((g) => g.key === key) || null)
              }
            >
              {(item) => (
                <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
              )}
            </Autocomplete>
          </div>

          {/* 헬스장 정보 */}
          <div className="space-y-2">
            {selectedGym ? (
              <>
                <div className="flex items-center gap-2">
                  <h1 className="text-[36px] font-semibold font-pretendard text-mono_900">
                    {selectedGym.label}
                  </h1>
                  <div className="flex items-center text-[24px]">
                    <StarIcon className="w-[24px] h-[24px] text-yellow-400 mr-1" />
                    <span className="text-mono_400 text-[24px]">
                      {selectedGym.rating.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center text-[20px] text-mono_400 font-pretendard">
                  <MapPinIcon className="w-5 h-5 mr-1" /> {selectedGym.location}
                </div>
              </>
            ) : (
              <div className="text-xl text-mono_400 font-pretendard">
                헬스장을 선택해주세요
              </div>
            )}
          </div>

          {/* 센터 소개 */}
          <div className="space-y-2">
            <h3 className="text-[16px] font-semibold font-pretendard text-mono_900">
              센터 소개
            </h3>
            <Textarea
              className="resize-none overflow-auto h-[300px]"
              maxRows={16}
              minRows={10}
              placeholder="센터를 소개해주세요"
              variant="bordered"
            />
          </div>

          {/* 운영 시작 & 종료 */}
          <div className="flex gap-4">
            <div className="space-y-2 w-[200px]">
              <h3 className="text-[16px] font-semibold font-pretendard text-mono_900">
                운영 시작
              </h3>
              <input className="h-10 w-full border rounded px-2" type="time" />
            </div>
            <div className="space-y-2 w-[200px]">
              <h3 className="text-[16px] font-semibold font-pretendard text-mono_900">
                운영 종료
              </h3>
              <input className="h-10 w-full border rounded px-2" type="time" />
            </div>
          </div>

          {/* 이용 요금 (무조건 아래 줄) */}
          <div className="space-y-2 w-[200px]">
            <h3 className="text-[16px] font-semibold font-pretendard text-mono_900">
              이용 요금
            </h3>
            <NumberInput
              className="w-full"
              label="1시간 요금 (원)"
              min={0}
              placeholder="ex) 10000"
            />
          </div>

          {/* --- 편의시설 영역 --- */}
          <div className="space-y-2">
            <h3 className="text-[16px] font-semibold font-pretendard text-mono_900">
              편의시설 선택
            </h3>
            <div className="flex gap-2 flex-wrap">
              {allFacilities.map((facility) => (
                <Button
                  key={facility}
                  className="w-[80px] h-[80px] flex flex-col items-center justify-center space-y-1"
                  variant={
                    selectedFacilities.includes(facility) ? 'solid' : 'outline'
                  }
                  onClick={() => toggleFacility(facility)}
                >
                  <img
                    alt={facility}
                    className="w-10 h-10"
                    src={facilityIcons[facility]}
                  />
                  <span className="text-xs">{facility}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* 🟣 운동기구 추가 */}
          <div className="space-y-2">
            <h3 className="text-[16px] font-semibold">운동기구 추가</h3>
            <div className="flex gap-2">
              <Input
                className="h-10 w-[200px]"
                placeholder="기구 이름"
                value={equipmentName}
                onChange={(e) => setEquipmentName(e.target.value)}
              />

              <NumberInput
                className="h-10 w-[120px] [&>input]:h-10" // 핵심
                min={1}
                placeholder="개수"
                value={equipmentCount}
                onChange={(val) => setEquipmentCount(Number(val))}
              />

              <Button className="h-10" onClick={addEquipment}>
                추가
              </Button>
            </div>
            {/* 운동기구 리스트 */}
            <div className="flex flex-wrap gap-3 pt-2">
              {equipments.map((eq) => (
                <Card
                  key={eq.name}
                  className="w-[140px] p-3 shadow-sm rounded-xl space-y-1"
                >
                  <CardBody className="p-0 text-center space-y-1">
                    <div className="font-medium truncate">{eq.name}</div>
                    <div className="text-sm text-mono_500">
                      보유 숫자: {eq.count} 개
                    </div>
                  </CardBody>
                  <CardFooter className="flex justify-center p-0 pt-2">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onClick={() => removeEquipment(eq.name)}
                    >
                      <TrashIcon className="w-4 h-4 text-red-500" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* 오른쪽 이미지 영역 */}
        <div className="flex-[2] p-[60px] space-y-5 border-l border-mono_200 overflow-auto">
          <h2 className="text-[36px] font-semibold font-pretendard">
            사진 수정 / 추가
          </h2>

          <div className="border rounded bg-mono_100 p-5 min-h-[300px]">
            {/* 이미지 업로드 영역 */}
            <div className="grid grid-cols-2 gap-5">
              {/* 업로드된 이미지 */}
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative w-[280px] h-[240px] rounded overflow-hidden bg-white shadow"
                >
                  <img
                    alt="업로드된 이미지"
                    className="w-full h-full object-cover"
                    src={image}
                  />
                  <button
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <TrashIcon className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              ))}

              {/* 업로드 버튼 */}
              <label
                className="w-[280px] h-[240px] border border-dashed rounded cursor-pointer flex items-center justify-center bg-white hover:bg-mono_50"
                htmlFor="image-upload"
              >
                <input
                  multiple
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                  type="file"
                  onChange={handleImageUpload}
                />
                <span className="text-sm text-mono_400">+ 사진 추가</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
