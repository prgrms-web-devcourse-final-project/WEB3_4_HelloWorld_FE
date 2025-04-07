'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import InputField from '@/app/(main)/login/components/InputField';
import CustomButton from '@/app/(main)/login/components/CustomButton';
import LevelBadge from '@/components/atoms/LevelBadge';
import AddressInput from '@/components/molecules/AddressInput';
import { getUserInfo, updateUserInfo } from '@/apis/userApi';
import { UserData } from '@/types/UserData';

const UserForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserInfo();

        const mappedData = {
          ...data,
          profileImageUrl: data.profileUrl,
        };

        setUserInfo(mappedData);
      } catch {
        alert('사용자 정보 불러오기 실패');
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numberFields = ['recentSquat', 'recentDeadlift', 'recentBench'];
    const parsedValue = numberFields.includes(name) ? Number(value) : value;

    setUserInfo((prev) => (prev ? { ...prev, [name]: parsedValue } : prev));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setSelectedImage(file);

    setUserInfo((prev) =>
      prev ? { ...prev, profileImageUrl: imageUrl } : prev,
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo) return;

    try {
      await updateUserInfo(userInfo, selectedImage ?? undefined);
      alert('수정 완료되었습니다');
    } catch {
      alert('수정 중 오류가 발생했습니다.');
    }
  };

  if (!userInfo) return <p>로딩 중...</p>;

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 mb-[60px] mr-[170px]">
        <button
          className="w-[100px] h-[100px] rounded-full bg-gray-300 shadow-md overflow-hidden cursor-pointer relative"
          type="button"
          onClick={() => fileInputRef.current?.click()}
        >
          {userInfo.profileUrl && (
            <Image
              fill
              alt="변경 되었으니 권환문제"
              className="rounded-full object-cover"
              src={userInfo.profileUrl || '/assets/images/defaultProfile.png'}
            />
          )}
        </button>

        <input
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          type="file"
          onChange={handleImageChange}
        />

        <LevelBadge level={4} />

        <div className="text-[18px] font-semibold text-mono_900">
          {userInfo.memberName || '이름 없음'} ✏️
        </div>
      </div>

      <InputField
        required
        containerMarginBottom="60px"
        height="62px"
        label="이름"
        labelInputGap="5px"
        name="memberName"
        placeholder="홍길동"
        value={userInfo.memberName}
        width="452px"
        onChange={handleChange}
      />

      <InputField
        required
        containerMarginBottom="60px"
        height="62px"
        label="전화번호"
        labelInputGap="5px"
        name="phoneNumber"
        placeholder="010-1234-5678"
        value={userInfo.phoneNumber}
        width="452px"
        onChange={handleChange}
      />

      <InputField
        required
        containerMarginBottom="60px"
        height="62px"
        label="이메일"
        labelInputGap="5px"
        name="email"
        placeholder="hong@example.com"
        type="email"
        value={userInfo.email}
        width="452px"
        onChange={handleChange}
      />

      <InputField
        required
        containerMarginBottom="60px"
        height="62px"
        label="생년월일"
        labelInputGap="5px"
        name="birthday"
        placeholder="2000.01.01"
        value={userInfo.birthday}
        width="452px"
        onChange={handleChange}
      />

      <div className="flex gap-[62px] mb-[60px]">
        <InputField
          required
          containerMarginBottom="0"
          height="62px"
          label="키"
          labelInputGap="5px"
          name="height"
          placeholder="160cm"
          value={userInfo.height}
          width="195px"
          onChange={handleChange}
        />
        <InputField
          required
          containerMarginBottom="0"
          height="62px"
          label="몸무게"
          labelInputGap="5px"
          name="weight"
          placeholder="60kg"
          value={userInfo.weight}
          width="195px"
          onChange={handleChange}
        />
      </div>

      <div className="mb-[30px] flex justify-start">
        <div className="relative">
          <AddressInput
            setAddress={(newAddress) =>
              setUserInfo((prev) =>
                prev ? { ...prev, address: newAddress } : prev,
              )
            }
            value={userInfo.address}
          />
        </div>
      </div>

      <div className="flex gap-[20px] mb-[60px]">
        <InputField
          required
          containerMarginBottom="0"
          height="62px"
          label="스쿼트"
          labelInputGap="5px"
          name="recentSquat"
          placeholder="100"
          type="number"
          value={userInfo.recentSquat.toString()}
          width="140px"
          onChange={handleChange}
        />
        <InputField
          required
          containerMarginBottom="0"
          height="62px"
          label="데드리프트"
          labelInputGap="5px"
          name="recentDeadlift"
          placeholder="100"
          type="number"
          value={userInfo.recentDeadlift.toString()}
          width="140px"
          onChange={handleChange}
        />
        <InputField
          required
          containerMarginBottom="0"
          height="62px"
          label="벤치프레스"
          labelInputGap="5px"
          name="recentBench"
          placeholder="100"
          type="number"
          value={userInfo.recentBench.toString()}
          width="140px"
          onChange={handleChange}
        />
      </div>

      <CustomButton className="bg-main text-mono_100 " type="submit">
        수정하기
      </CustomButton>
    </form>
  );
};

export default UserForm;
