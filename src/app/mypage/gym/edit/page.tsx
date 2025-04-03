'use client';

import { useState } from 'react';
import {
  Autocomplete,
  AutocompleteItem,
  NumberInput,
  Button,
  Input,
  TimeInput,
} from '@heroui/react';
import {
  StarIcon,
  MapPinIcon,
  TrashIcon,
  PhoneIcon,
  PlusIcon,
} from '@heroicons/react/24/solid';

import { NumberInputBase } from '@/components/atoms/NumberInputBase';
import { CustomTextarea } from '@/components/atoms/TextareaBase';
import { FacilityButton } from '@/components/atoms/FacilityButton';
const gyms = [
  {
    label: '비헬씨 서초점',
    key: 'gym1',
    location: '서울시 강남구 역삼동',
    rating: 4.66,
    phone: '02-123-4567', // 추가
  },
  {
    label: '머슬팩토리',
    key: 'gym2',
    location: '서울시 강남구 강남대로',
    rating: 4.5,
    phone: '02-234-5678',
  },
  {
    label: '강남 피트니스',
    key: 'gym3',
    location: '서울시 강남구 테헤란로',
    rating: 4.7,
    phone: '02-345-6789',
  },
  {
    label: '스파르탄짐',
    key: 'gym4',
    location: '서울시 서초구 반포동',
    rating: 4.4,
    phone: '02-456-7890',
  },
  {
    label: '아이언짐',
    key: 'gym5',
    location: '서울시 강남구 논현동',
    rating: 4.55,
    phone: '02-567-8901',
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

const facilityKeys = {
  수건: 'towel',
  샤워실: 'showerRoom',
  주차장: 'parking',
  사우나: 'sauna',
  개인락커: 'locker',
  운동복: 'sportswear',
  와이파이: 'wifi',
  인바디: 'inbody',
};

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

const maxSlots = 8;

export default function GymEditPage() {
  const [selectedGym, setSelectedGym] = useState<any>(null);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [intro, setIntro] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  // const [productMonth, setProductMonth] = useState<number | null>(1);
  const [productFee, setProductFee] = useState<number | null>(0);
  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentCount, setEquipmentCount] = useState<number | null>(null);
  const [equipments, setEquipments] = useState<
    { name: string; count: number }[]
  >([]);
  const [images, setImages] = useState<File[]>([]);

  const [equipmentImage, setEquipmentImage] = useState<File | null>(null);
  const [equipmentImageName, setEquipmentImageName] = useState<string>('');

  // 파일 핸들러 수정
  const handleEquipmentImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setEquipmentImage(e.target.files[0]);
      setEquipmentImageName(e.target.files[0].name);
    }
  };

  // 기구 추가
  const addEquipment = () => {
    if (!equipmentName || !equipmentCount || equipmentCount <= 0) return;
    setEquipments([
      ...equipments,
      {
        name: equipmentName,
        count: equipmentCount,
        image: equipmentImage, // 추가됨
      },
    ]);
    // 입력값 초기화
    setEquipmentName('');
    setEquipmentCount(null);
    setEquipmentImage(null);
    setEquipmentImageName('');
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    setImages((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!selectedGym) return alert('헬스장을 선택해주세요.');

    const formData = new FormData();
    const gymId = selectedGym.key;

    formData.append(
      'content',
      JSON.stringify({
        gym: {
          gymName: selectedGym.label,
          startTime,
          endTime,
          phoneNumber: selectedGym.phone,
          isPartner: true,
          address: selectedGym.location,
          xField: '0',
          yField: '0',
          intro,
          deleteImageIds: [],
        },
        facility: Object.fromEntries(
          Object.entries(facilityKeys).map(([kor, eng]) => [
            eng,
            selectedFacilities.includes(kor),
          ]),
        ),
        machine: equipments.map((eq) => ({
          machineName: eq.name,
          account: eq.count,
        })),
        gymProduct: {
          gymProductFee: productFee,
        },
      }),
    );

    images.forEach((file) => {
      formData.append('gymImages', file);
    });

    await fetch(`/gym/${gymId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer YOUR_ACCESS_TOKEN`,
      },
      body: formData,
    });

    alert('수정 완료!');
  };

  return (
    <div className="fixed inset-0 top-[64px] h-[calc(100vh-64px)] w-full flex justify-center overflow-hidden">
      <div className="w-full max-w-[1920px] flex overflow-hidden">
        <div className="w-[200px] bg-mono_200 flex-shrink-0" />
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-[3] p-[60px] space-y-10 overflow-auto">
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
                    <MapPinIcon className="w-5 h-5 mr-1" />{' '}
                    {selectedGym.location}
                  </div>
                  <div className="flex items-center text-[16px] text-mono_500 font-pretendard">
                    <PhoneIcon className="w-4 h-4 mr-1" /> {selectedGym.phone}
                  </div>
                </>
              ) : (
                <div className="text-xl text-mono_400 font-pretendard">
                  헬스장을 선택해주세요
                </div>
              )}
            </div>
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
                  <AutocompleteItem key={item.key}>
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </div>

            {/* 센터 소개 */}
            <div className="space-y-2 max-w-full">
              <h3 className="text-[16px] font-semibold font-pretendard text-mono_900">
                센터 소개
              </h3>
              <CustomTextarea
                color="custom"
                maxRows={16}
                minRows={10}
                placeholder="센터를 소개해주세요"
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
              />
            </div>

            {/* 운영 시작 & 종료 */}
            <div className="flex gap-4">
              <div className="space-y-2 w-[200px]">
                <h3 className="text-[16px] font-semibold font-pretendard text-mono_900">
                  운영 시작
                </h3>
                <TimeInput
                  className="h-10 w-full"
                  placeholder="시작 시간"
                  value={startTime}
                  onChange={(val) => setStartTime(val)}
                />
              </div>

              <div className="space-y-2 w-[200px]">
                <h3 className="text-[16px] font-semibold font-pretendard text-mono_900">
                  운영 종료
                </h3>
                <TimeInput
                  className="h-10 w-full"
                  placeholder="종료 시간"
                  value={endTime}
                  onChange={(val) => setEndTime(val)}
                />
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
                value={productFee}
                onChange={(val) => setProductFee(Number(val))}
              />
            </div>

            {/* --- 편의시설 영역 --- */}
            <div className="space-y-2">
              <h3 className="text-[16px] font-semibold font-pretendard text-mono_900">
                편의시설 선택
              </h3>
              <div className="flex gap-2 flex-wrap">
                {allFacilities.map((facility) => (
                  <FacilityButton
                    key={facility}
                    icon={facilityIcons[facility]}
                    label={facility}
                    selected={selectedFacilities.includes(facility)}
                    onClick={() => toggleFacility(facility)}
                  />
                ))}
              </div>
            </div>

            {/* 운동기구 추가 */}
            <div className="space-y-2">
              <h3 className="text-[16px] font-semibold">운동기구 추가</h3>
              <div className="flex gap-2">
                <Input
                  className="h-10 w-[180px]"
                  placeholder="기구 이름"
                  value={equipmentName}
                  onChange={(e) => setEquipmentName(e.target.value)}
                />
                <NumberInputBase
                  className="w-[80px]"
                  min={1}
                  placeholder="개수"
                  size="xs"
                  value={equipmentCount}
                  onChange={(val) => setEquipmentCount(Number(val))}
                />
                <label
                  className="w-[120px] h-10 border border-dashed rounded cursor-pointer flex items-center justify-center bg-white hover:bg-mono_50"
                  htmlFor="equipment-image"
                >
                  <input
                    accept="image/*"
                    className="hidden"
                    id="equipment-image"
                    type="file"
                    onChange={handleEquipmentImage}
                  />
                  <span className="text-xs text-mono_400">
                    {equipmentImageName || '+ 사진'}
                  </span>
                </label>

                <Button className="h-10" onClick={addEquipment}>
                  추가
                </Button>
              </div>

              {/* 운동기구 리스트 */}
              <div className="flex flex-wrap gap-3 pt-2">
                {equipments.map((eq) => (
                  <div
                    key={eq.name}
                    className="group relative w-[140px] p-3 border rounded-xl transition-all hover:bg-mono_200 space-y-1"
                  >
                    {/* 삭제버튼 (오른쪽 상단) */}
                    <Button
                      isIconOnly
                      className="absolute top-2 right-2 transition-colors"
                      size="sm"
                      variant="light"
                      onClick={() => removeEquipment(eq.name)}
                    >
                      <TrashIcon className="w-6 h-6 text-mono_900 group-hover:text-main" />
                    </Button>

                    {/* 이미지 */}
                    <div className="w-full h-[80px] rounded bg-mono_200 overflow-hidden">
                      <img
                        alt="equipment"
                        className="w-full h-full object-cover"
                        src={
                          eq.image
                            ? URL.createObjectURL(eq.image)
                            : '/default-image.png'
                        }
                      />
                    </div>

                    {/* 텍스트 */}
                    <div className="font-medium truncate text-center">
                      {eq.name}
                    </div>
                    <div className="text-sm text-mono_500 text-center">
                      보유 숫자: {eq.count} 개
                    </div>
                  </div>
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
              <div className="grid grid-cols-2 gap-4">
                {/* 업로드된 이미지 */}
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-[7/6] rounded overflow-hidden bg-white shadow border"
                  >
                    <img
                      alt="업로드된 이미지"
                      className="w-full h-full object-cover"
                      src={
                        typeof image === 'string'
                          ? image
                          : URL.createObjectURL(image)
                      }
                    />
                    <button
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <TrashIcon className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ))}

                {/* 추가 버튼 👉 무조건 마지막 이미지 바로 다음 */}
                <label
                  className="relative aspect-[7/6] border border-dashed rounded cursor-pointer overflow-hidden flex items-center justify-center bg-white hover:bg-mono_50"
                  htmlFor="image-upload"
                >
                  <img
                    alt="배경"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                    src="/gym/icons/healthboy.jpg"
                  />
                  <PlusIcon className="w-8 h-8 text-mono_400 group-hover:text-main transition" />
                  <input
                    multiple
                    accept="image/*"
                    className="hidden"
                    id="image-upload"
                    type="file"
                    onChange={handleImageUpload}
                  />
                </label>

                {/* 빈칸으로 나머지 채우기 */}
                {Array.from({
                  length: Math.max(maxSlots - images.length - 1, 0),
                }).map((_, idx) => (
                  <div
                    key={`empty-${idx}`}
                    className="aspect-[7/6] border border-dashed rounded bg-white"
                  />
                ))}
              </div>
            </div>

            <Button
              className="h-12 w-full mt-4"
              color="primary"
              onClick={handleSubmit}
            >
              수정 완료
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
