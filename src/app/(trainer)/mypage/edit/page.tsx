'use client';

import { useEffect, useState } from 'react';
import { Textarea } from '@heroui/react';
import Image from 'next/image';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useMutation } from '@tanstack/react-query';

import PtCardSection from '@/components/molecules/PT/PtCardSection';
import InputField from '@/app/(main)/login/components/InputField';
import BankSelect from '@/app/(main)/login/components/BankSelect';
import { MyButton } from '@/components/atoms/Button';
import { useAuthStore } from '@/stores/memberTypeStore';
import fetcher from '@/utils/apiInstance';
import useToast from '@/hooks/useToast';
import AwardForm from '@/components/organisms/TrainerMypage/AwardForm';

export default function MyPageEdit() {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [awards, setAwards] = useState<string[]>(['']);
  const [formData, setFormData] = useState<any>({});
  const { showToast } = useToast();
  const { mutate } = useMutation({
    mutationFn: async (formData: FormData) => {
      await fetcher('/trainer/modify', {
        method: 'PUT',
        body: formData,
      });
    },
    onSuccess: () => {
      showToast({
        title: '수정 성공',
        description: '트레이너 정보가 수정되었습니다.',
      });
    },
    onError: () => {
      showToast({
        title: '수정 실패',
        description: '트레이너 정보 수정에 실패했습니다.',
      });
    },
  });

  const user = useAuthStore((state) => state.user);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAwardChange = (index: number, value: string) => {
    const updated = [...awards];

    updated[index] = value;
    setAwards(updated);
  };

  const addAward = () => setAwards([...awards, '']);
  const removeAward = (index: number) => {
    const updated = awards.filter((_, i) => i !== index);

    setAwards(updated);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trainerData = {
      trainerName: formData.trainerName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      bank: formData.bank,
      account: formData.account,
      intro: formData.intro,
      career: formData.career,
      field: formData.field,
    };

    console.log(trainerData);
    const payload = new FormData();

    payload.append(
      'request',
      new Blob([JSON.stringify(trainerData)], {
        type: 'application/json',
      }),
    );

    if (profileImage) {
      payload.append('image', profileImage);
    }

    mutate(payload);
  };

  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

  return (
    <PtCardSection>
      <form className="flex gap-10 w-full" onSubmit={handleSubmit}>
        <div className="flex w-full flex-col">
          <div className="flex max-w-fit mb-6 flex-col relative gap-4">
            <Image
              alt="미리보기"
              className="rounded-medium object-cover"
              height={150}
              src={previewUrl || '/gym/icons/healthboy.jpg'}
              width={150}
            />
            <label
              className="cursor-pointer flex items-center justify-center gap-2 w-10 h-10  absolute -right-2 p-2 -bottom-2 border-gray-300 rounded-full bg-gray-50 hover:bg-gray-100 transition"
              htmlFor="image-upload"
            >
              <PlusIcon className="w-6 h-6 text-gray-500" />
            </label>

            <input
              accept="image/*"
              className="hidden"
              id="image-upload"
              type="file"
              onChange={handleImageUpload}
            />
          </div>
          <InputField
            containerMarginBottom="60px"
            height="62px"
            label="이름"
            labelInputGap="5px"
            name="trainerName"
            placeholder="이름을 입력해주세요."
            value={formData.trainerName || ''}
            width="100%"
            onChange={handleChange}
          />
          <InputField
            containerMarginBottom="60px"
            height="62px"
            label="전화번호"
            labelInputGap="5px"
            name="phoneNumber"
            placeholder="010-0000-0000"
            value={formData.phoneNumber || ''}
            width="100%"
            onChange={handleChange}
          />
          <InputField
            containerMarginBottom="60px"
            height="62px"
            label="이메일"
            labelInputGap="5px"
            name="email"
            placeholder="ghdrlfehd123@naver.com"
            type="email"
            value={formData.email || ''}
            width="100%"
            onChange={handleChange}
          />
          <div className="flex gap-[62px] mb-[60px]">
            <div style={{ width: '150px' }}>
              <BankSelect
                height="32px"
                selectedBank={formData.bank || ''}
                setSelectedBank={(e) =>
                  setFormData((prev: any) => ({ ...prev, bank: e }))
                }
                width="150px"
              />
            </div>

            <div style={{ width: '100%' }}>
              <InputField
                containerMarginBottom="0"
                height="62px"
                label="계좌번호"
                labelInputGap="5px"
                name="account"
                placeholder="000-0000-0000-00"
                value={formData.account || ''}
                width="100%"
                onChange={handleChange}
              />
            </div>
          </div>
          <MyButton className="bg-main text-mono_100 mb-[20px] " type="submit">
            정보 수정
          </MyButton>
        </div>

        <div className="w-full flex flex-col gap-6">
          <InputField
            containerMarginBottom="0"
            height="62px"
            label="경력"
            labelInputGap="5px"
            name="career"
            placeholder="경력"
            value={formData.career || ''}
            width="100%"
            onChange={handleChange}
          />
          <InputField
            containerMarginBottom="0"
            height="62px"
            label="전문분야"
            labelInputGap="5px"
            name="field"
            placeholder="ex)다이어트"
            value={formData.field || ''}
            width="100%"
            onChange={handleChange}
          />
          <Textarea
            className="w-full "
            classNames={{
              innerWrapper: 'h-full',
            }}
            label="자기소개"
            labelPlacement="outside"
            name="intro"
            placeholder="자기소개를 입력해주세요."
            value={formData.intro || ''}
            onChange={handleChange}
          />

          <AwardForm />
        </div>
      </form>
    </PtCardSection>
  );
}
