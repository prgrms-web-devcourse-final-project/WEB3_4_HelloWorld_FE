'use client';

import Image from 'next/image';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import {
  addToast,
  Button,
  Form,
  Input,
  NumberInput,
  Textarea,
} from '@heroui/react';
import { useMutation } from '@tanstack/react-query';

import PtCardSection from '@/components/molecules/PT/PtCardSection';
import fetcher from '@/utils/apiInstance';
import useToast from '@/hooks/useToast';

const maxSlots = 8;

export default function RegisterPtPage() {
  const [images, setImages] = useState<File[]>([]);

  const { mutate } = useMutation({
    mutationFn: async (formData: FormData) => {
      await fetcher('/ptProduct', {
        method: 'POST',
        body: formData,
      });
    },
    onSuccess: () => {
      showToast({
        title: '등록 성공',
        description: 'PT 상품이 등록되었습니다.',
      });
    },
    onError: () => {
      showToast({
        title: '등록 실패',
        description: 'PT 상품 등록에 실패했습니다.',
      });
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    setImages((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const formData = new FormData();

    formData.append(
      'ptProductData',
      new Blob([JSON.stringify(data)], { type: 'application/json' }),
    );

    images.forEach((file) => formData.append('images', file));

    mutate(formData);
  };
  const { showToast } = useToast();

  return (
    <>
      <div className="flex w-full">
        <div className="w-full">
          <PtCardSection title="PT 등록">
            <Form
              className="w-full h-full flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <Input
                fullWidth
                isRequired
                errorMessage="상품명은 필수 항목입니다."
                label="상품명"
                labelPlacement="outside"
                name="ptProductName"
                placeholder="상품명을 입력해주세요."
                size="lg"
              />
              <NumberInput
                fullWidth
                isRequired
                name="ptProductFee"
                placeholder="가격을 입력해주세요."
                size="lg"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">KRW</span>
                  </div>
                }
                type="text"
              />

              <Textarea
                fullWidth
                classNames={{
                  innerWrapper: 'h-[550px]',
                }}
                label="상품 소개"
                labelPlacement="outside"
                maxRows={20}
                name="info"
                placeholder="상품 소개를 입력해주세요."
                size="lg"
              />
              <Button
                className="h-12 w-full mt-4"
                color="primary"
                type="submit"
              >
                등록하기
              </Button>
            </Form>
          </PtCardSection>
        </div>
        <div className="w-full">
          <PtCardSection title="PT 상품 이미지">
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
                        <TrashIcon className="w-4 h-4 text-red-500" />
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
            </div>
            <Button
              color="primary"
              onPress={() => {
                addToast({
                  title: '등록 성공',
                  description: 'PT 상품이 등록되었습니다.',
                  variant: 'flat',
                });
              }}
            />
          </PtCardSection>
        </div>
      </div>
    </>
  );
}
