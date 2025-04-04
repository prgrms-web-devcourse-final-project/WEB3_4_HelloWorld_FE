'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import InputField from '@/app/login/components/InputField';
import CustomButton from '@/app/login/components/CustomButton';
import LevelBadge from '@/components/atoms/LevelBadge';
import { UserData } from '@/types/UserData';
import AddressInput from '@/components/molecules/AddressInput';

const UserForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [setAddress] = useState('');
  const [form, setForm] = useState<Omit<UserData, 'gender'>>({
    memberName: '',
    phoneNumber: '',
    email: '',
    birthday: '',
    height: '',
    weight: '',
    address: '',
    recentBench: 0,
    recentSquat: 0,
    recentDeadlift: 0,
    profileImageUrl: '',
  });

  // 사용자 정보 불러오기 요청 추후 수정 필요 <- 임시 코드 백앤드 구현 안됨
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/member', {
          credentials: 'include',
        });
        const data = await res.json();

        setForm({
          memberName: data.memberName ?? '',
          phoneNumber: data.phoneNumber ?? '',
          email: data.email ?? '',
          birthday: data.birthday ?? '',
          height: data.height ?? '',
          weight: data.weight ?? '',
          address: data.address ?? '',
          recentBench: data.recentBench ?? 0,
          recentSquat: data.recentSquat ?? 0,
          recentDeadlift: data.recentDeadlift ?? 0,
          profileImageUrl: data.profileImageUrl ?? '',
        });
      } catch {
        throw new Error('사용자 정보 불러오기 실패');
      }
    };

    fetchUser();
  }, []);
  // 임시 코드 입니다.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numberFields = ['recentSquat', 'recentDeadlift', 'recentBench'];
    const parsedValue = numberFields.includes(name) ? Number(value) : value;

    setForm((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    const imageUrl = URL.createObjectURL(file);

    setForm((prev) => ({ ...prev, profileImageUrl: imageUrl }));
  };
  // 임시 코드 입니다.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { ...requestPayload } = form;
      const res = await fetch('/member/info', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload),
      });

      if (!res.ok) throw new Error('수정 실패');
      alert('수정 완료!');
    } catch {
      alert('수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 mb-[60px] mr-[170px]">
        <button
          className="w-[100px] h-[100px] rounded-full bg-gray-300 shadow-md overflow-hidden cursor-pointer relative"
          type="button"
          onClick={() => fileInputRef.current?.click()}
        >
          {form.profileImageUrl && (
            <Image
              fill
              alt="프로필 이미지"
              className="rounded-full object-cover"
              src={form.profileImageUrl}
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
          {form.memberName || '이름 없음'} ✏️
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
        value={form.memberName}
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
        value={form.phoneNumber}
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
        value={form.email}
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
          value={form.height}
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
          value={form.weight}
          width="195px"
          onChange={handleChange}
        />
      </div>

      <div className="mb-[30px] flex justify-start">
        <div className="relative">
          <AddressInput setAddress={setAddress} />
          <div className="absolute right-3 top-[23px]" />
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
          value={form.recentSquat.toString()}
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
          value={form.recentDeadlift.toString()}
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
          value={form.recentBench.toString()}
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
