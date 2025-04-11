'use client';

import Image from 'next/image';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Button, Form, Input, NumberInput, Textarea } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import PtCardSection from '@/components/molecules/PT/PtCardSection';
import fetcher from '@/utils/apiInstance';
import useToast from '@/hooks/useToast';

type Props = {
  isEditMode?: boolean;
  initialData?: {
    ptProductId?: number;
    ptProductName?: string;
    ptProductFee?: number;
    info?: string;
    images?: string[];
  };
};

const maxSlots = 8;

export default function TrainerPtProductForm({
  isEditMode = false,
  initialData,
}: Props) {
  const { showToast } = useToast();
  const router = useRouter();
  const [images, setImages] = useState<(string | File)[]>(
    initialData?.images || [],
  );
  const [deleteImages, setDeleteImages] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const [formState, setFormState] = useState({
    ptProductName: initialData?.ptProductName || '',
    ptProductFee: initialData?.ptProductFee || 0,
    info: initialData?.info || '',
  });

  const { mutate } = useMutation({
    mutationFn: async (formData: FormData) => {
      const url = isEditMode
        ? `/ptProduct/${initialData?.ptProductId}`
        : `/ptProduct`;
      const method = isEditMode ? 'PUT' : 'POST';

      await fetcher(url, {
        method,
        body: formData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['myPtProducts'],
      });
      queryClient.invalidateQueries({
        queryKey: ['PtProductDe'],
      });
      showToast({
        title: isEditMode ? '수정 성공' : '등록 성공',
        lazy: true,
        description: isEditMode
          ? 'PT 상품이 수정되었습니다.'
          : 'PT 상품이 등록되었습니다.',
      });
      router.replace('/mypage/pt');
    },
    onError: () => {
      showToast({
        title: isEditMode ? '수정 실패' : '등록 실패',
        lazy: true,
        description: isEditMode
          ? 'PT 상품 수정에 실패했습니다.'
          : 'PT 상품 등록에 실패했습니다.',
        type: 'danger',
      });
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    setImages((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (index: number) => {
    const target = images[index];

    if (isEditMode && typeof target === 'string') {
      setDeleteImages((prev) => [...prev, target]);
    }

    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (field: string, value: any) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    const ptProductData: Record<string, any> = {
      ptProductName: formState.ptProductName,
      ptProductFee: formState.ptProductFee,
      info: formState.info,
    };

    if (isEditMode) {
      ptProductData.deleteImageIds = deleteImages;
    }

    formData.append(
      'ptProductData',
      new Blob([JSON.stringify(ptProductData)], {
        type: 'application/json',
      }),
    );

    images.forEach((img) => {
      if (typeof img !== 'string') {
        formData.append('images', img);
      }
    });

    mutate(formData);
  };

  return (
    <div className="flex w-full">
      <div className="w-full">
        <PtCardSection title={isEditMode ? 'PT 수정' : 'PT 등록'}>
          <Form
            className="w-full h-full flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <Input
              fullWidth
              isRequired
              label="상품명"
              labelPlacement="outside"
              name="ptProductName"
              placeholder="상품명을 입력해주세요."
              value={formState.ptProductName}
              onChange={(e) => handleChange('ptProductName', e.target.value)}
            />
            <NumberInput
              fullWidth
              isRequired
              label="가격"
              name="ptProductFee"
              startContent={
                <span className="text-default-400 text-sm">KRW</span>
              }
              value={formState.ptProductFee}
              onValueChange={(e) => handleChange('ptProductFee', e)}
            />
            <Textarea
              fullWidth
              classNames={{ innerWrapper: 'h-[550px]' }}
              label="상품 소개"
              labelPlacement="outside"
              name="info"
              placeholder="상품 소개를 입력해주세요."
              value={formState.info}
              onChange={(e) => handleChange('info', e.target.value)}
            />
            <Button className="h-12 w-full mt-4" color="primary" type="submit">
              {isEditMode ? '수정하기' : '등록하기'}
            </Button>
          </Form>
        </PtCardSection>
      </div>

      <div className="w-full">
        <PtCardSection title="PT 상품 이미지">
          <div className="w-full border-mono_100">
            <h2 className="text-lg pb-4 font-semibold font-pretendard">
              사진 수정 / 추가
            </h2>
            <div className="border rounded bg-mono_100 flex flex-col p-5">
              <div className="grid grid-cols-3 gap-4">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative rounded bg-white shadow border"
                  >
                    <Image
                      fill
                      alt="업로드 이미지"
                      className="object-cover"
                      sizes="md"
                      src={
                        typeof img === 'string' ? img : URL.createObjectURL(img)
                      }
                    />
                    <button
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                      onClick={() => handleRemoveImage(idx)}
                    >
                      <TrashIcon className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ))}

                {images.length < maxSlots && (
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
                )}
                {Array.from({
                  length: Math.max(maxSlots - images.length - 1, 0),
                }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="w-full aspect-[7/6] h-full border border-dashed rounded bg-mono_000"
                  />
                ))}
              </div>
            </div>
          </div>
        </PtCardSection>
      </div>
    </div>
  );
}
