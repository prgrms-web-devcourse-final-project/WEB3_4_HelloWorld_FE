'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Time, parseTime } from '@internationalized/date';
import {
  AutocompleteItem,
  NumberInput,
  Button,
  Input,
  TimeInput,
  Autocomplete,
} from '@heroui/react';
import {
  StarIcon,
  MapPinIcon,
  PhoneIcon,
  PlusIcon,
} from '@heroicons/react/24/solid';
import { TrashIcon as OutlineTrashIcon } from '@heroicons/react/24/outline';

import { NumberInputBase } from '@/components/atoms/NumberInputBase';
import { CustomTextarea } from '@/components/atoms/TextareaBase';
import { FacilityButton } from '@/components/atoms/FacilityButton';
import { fetchGymListOwnerApi } from '@/apis/gymApi';

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

const maxSlots = 8;

export default function GymEditPage() {
  const [selectedGym, setSelectedGym] = useState<any>(null);
  const [gymOptions, setGymOptions] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startTime, setStartTime] = useState<Time | null>(null);
  const [endTime, setEndTime] = useState<Time | null>(null);
  const [intro, setIntro] = useState('');
  const [productFee, setProductFee] = useState<number | null>(0);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentCount, setEquipmentCount] = useState<number | null>(null);
  const [equipmentImage, setEquipmentImage] = useState<File | undefined>();
  const [equipmentImageName, setEquipmentImageName] = useState('');
  const [equipments, setEquipments] = useState<
    { name: string; count: number; image?: File }[]
  >([]);
  const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (!searchTerm) return setGymOptions([]);
      const result = await fetchGymListOwnerApi(0, 10, searchTerm);
      const mapped = result.map((gym) => ({
        key: String(gym.gymId),
        label: gym.gymName,
        location: gym.address,
        rating: gym.avgScore ?? 0,
        startTime: gym.startTime,
        endTime: gym.endTime,
        xField: gym.xField,
        yField: gym.yField,
        thumbnailImage: gym.thumbnailImage,
        phone: gym.phone || '',
      }));

      setGymOptions(mapped);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  useEffect(() => {
    if (selectedGym?.startTime) {
      try {
        setStartTime(parseTime(selectedGym.startTime));
      } catch {}
    }
    if (selectedGym?.endTime) {
      try {
        setEndTime(parseTime(selectedGym.endTime));
      } catch {}
    }
  }, [selectedGym]);

  const handleEquipmentImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setEquipmentImage(e.target.files[0]);
      setEquipmentImageName(e.target.files[0].name);
    }
  };

  const addEquipment = () => {
    if (!equipmentName || !equipmentCount || equipmentCount <= 0) return;
    setEquipments((prev) => [
      ...prev,
      { name: equipmentName, count: equipmentCount, image: equipmentImage },
    ]);
    setEquipmentName('');
    setEquipmentCount(null);
    setEquipmentImage(undefined);
    setEquipmentImageName('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    setImages((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleFacility = (facility: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility],
    );
  };

  const removeEquipment = (name: string) => {
    setEquipments((prev) => prev.filter((eq) => eq.name !== name));
  };

  const handleSubmit = async () => {
    if (!selectedGym) return alert('헬스장을 선택해주세요.');

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const accessToken = localStorage.getItem('accessToken');

    const formData = new FormData();

    const facilityKeys = {
      주차장: 'parking',
      샤워실: 'showerRoom',
      인바디: 'inBody',
      개인락커: 'locker',
      와이파이: 'wifi',
      운동복: 'sportsWear',
      수건: 'towel',
      사우나: 'sauna',
    };

    const facilityRequest = Object.fromEntries(
      Object.entries(facilityKeys).map(([kor, eng]) => [
        eng,
        selectedFacilities.includes(kor),
      ]),
    );

    const payload = {
      gymId: Number(selectedGym.key),
      gymInfoRequest: {
        gymRequest: {
          startTime: startTime ? startTime.toString() : '00:00',
          endTime: endTime ? endTime.toString() : '00:00',
          intro,
        },
        facilityRequest, //
        gymProductRequest: [
          {
            gymProductId: '',
            gymProductName: ' GymMate 제휴 헬스장 1달 이용권',
            gymProductMonth: '1',
            gymProductFee: productFee ?? 0,
          },
        ],
        gymProductDeleteIds: [],
      },
    };

    formData.append(
      'request',
      new Blob([JSON.stringify(payload)], { type: 'application/json' }),
    );

    // 이미지 파일들 append
    images.forEach((img) => formData.append('images', img));

    console.log('요청 데이터:', {
      payload,
      images: images.map((img) => ({
        name: img.name,
        size: img.size,
        type: img.type,
      })),
    });

    try {
      const response = await fetch(`${API_BASE_URL}/partnergym`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: formData,
      });

      const responseData = await response.json();

      console.log('응답 데이터:', responseData);

      if (!response.ok) throw new Error(`요청 실패: ${response.status}`);
      alert('헬스장 등록 완료!');
    } catch {
      alert('헬스장 등록 실패!');
    }
  };

  return (
    <div className=" inset-0 top-[64px] h-[calc(100vh-64px)] w-full flex justify-center ">
      <div className="w-full flex ">
        <div className="flex-1 flex gap-8 ">
          <div className=" w-full space-y-10 ">
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
                inputValue={searchTerm}
                items={gymOptions}
                label="헬스장 이름 검색"
                placeholder="헬스장 이름으로 검색하세요"
                selectedKey={selectedGym?.key}
                onInputChange={setSearchTerm}
                onSelectionChange={(key: string | number | null) => {
                  if (!key) return;

                  const selected = gymOptions.find(
                    (g) => g.key === String(key),
                  );

                  if (!selected) return;

                  setSelectedGym(selected);
                  setSearchTerm(selected.label);

                  const { gymInfo, facility, gymProducts, images } = selected;

                  if (gymInfo?.intro) setIntro(gymInfo.intro);
                  if (gymInfo?.startTime)
                    setStartTime(parseTime(gymInfo.startTime));
                  if (gymInfo?.endTime) setEndTime(parseTime(gymInfo.endTime));

                  if (Array.isArray(gymProducts)) {
                    setProductFee(gymProducts[0]?.gymProductFee ?? 0);
                  }

                  if (facility) {
                    const reverseFacilityKeys = {
                      parking: '주차장',
                      showerRoom: '샤워실',
                      inBody: '인바디',
                      locker: '개인락커',
                      wifi: '와이파이',
                      sportsWear: '운동복',
                      towel: '수건',
                      sauna: '사우나',
                    };

                    const selectedFacilityList = Object.entries(facility)
                      .filter(([, val]) => val)
                      .map(
                        ([key]) =>
                          reverseFacilityKeys[
                            key as keyof typeof reverseFacilityKeys
                          ],
                      )
                      .filter(Boolean);

                    setSelectedFacilities(selectedFacilityList);
                  }

                  if (Array.isArray(images)) {
                    setImages(images.map((img) => img.url));
                  }
                }}
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
                  label="시작 시간"
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
                  label="종료 시간"
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
                value={productFee ?? undefined} // ✅ null → undefined로 변경
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
                    icon={facilityIcons[facility]} // ✅ 이렇게 넘겨야 함
                    label={facility} // ✅ 이렇게 넘겨야 함
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
                  value={equipmentCount ?? undefined}
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
              운동기구 리스트
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
                      <OutlineTrashIcon className="w-6 h-6 text-mono_900 group-hover:text-main" />
                    </Button>

                    {/* 이미지 */}
                    <div className="w-full h-[80px] rounded bg-mono_200 overflow-hidden relative">
                      <Image
                        fill
                        alt="equipment"
                        className="object-cover"
                        src={
                          eq.image
                            ? URL.createObjectURL(eq.image)
                            : '/assets/images/pointpagesub.jpg'
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
          <div className="  w-full border-mono_100 ">
            <h2 className="text-lg pb-4 font-semibold font-pretendard">
              사진 수정 / 추가
            </h2>

            <div className="border rounded bg-mono_100 flex flex-col p-5">
              <div className="grid grid-cols-3  gap-4">
                {/* 업로드된 이미지 */}
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative  rounded  bg-white shadow border"
                  >
                    <Image
                      fill
                      alt="업로드된 이미지"
                      className="object-cover"
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
                      <OutlineTrashIcon className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ))}

                {/* 추가 버튼 👉 무조건 마지막 이미지 바로 다음 */}
                <label
                  className="relative aspect-[7/6] border border-dashed rounded cursor-pointer overflow-hidden flex items-center justify-center bg-white hover:bg-mono_50"
                  htmlFor="image-upload"
                >
                  <Image
                    fill
                    alt="배경"
                    className="object-cover opacity-50"
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
                    className=" w-full aspect-[7/6] h-full border border-dashed rounded bg-mono_000"
                  />
                ))}
              </div>
            </div>

            <Button
              className="h-12 w-full mt-4"
              color="primary"
              onClick={handleSubmit}
            >
              등록 완료
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
