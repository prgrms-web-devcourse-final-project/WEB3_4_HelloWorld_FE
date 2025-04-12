'use client';
import { Card } from '@heroui/card';
import {
  Accordion,
  AccordionItem,
  Textarea,
  useDisclosure,
} from '@heroui/react';
import { PencilIcon, PhotoIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import MainPtCard from '@/components/molecules/Main/MainPtCard';
import { MyButton } from '@/components/atoms/Button';
import PtProductDetailItem from '@/components/molecules/PT/PtProductDetailItem';
import PtCardSection from '@/components/molecules/PT/PtCardSection';
import GymListCardItem from '@/components/molecules/GYM/GymListCardItem';
import Star from '@/components/molecules/StarGroup';
import PtReviewItem from '@/components/molecules/PT/PtReviewItem';
import fetcher from '@/utils/apiInstance';
import { PtDetailResponse, PtProduct } from '@/types/pt.types';
import Loading from '@/app/loading';
import useToast from '@/hooks/useToast';
import { formatCash } from '@/utils/formatter';
import MulitpleImageUploader from '@/components/molecules/MultipleImageUpload';

export default function PtProductDetail() {
  const params = useParams();
  const { trainerId } = params;
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);
  const [content, setContent] = useState<string>('');
  const [score, setScore] = useState<number>(0);

  const queryClient = useQueryClient();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { showToast } = useToast();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['ptProductDetail'],
    queryFn: async () => {
      const response = await fetcher<PtDetailResponse>(
        `/ptProduct/trainer/${trainerId}`,
        {
          method: 'GET',
          token: false,
        },
      );

      return response;
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    setImages((prev) => [...prev, ...files]);
  };
  const scoreChange = (score: number) => {
    setScore(score);
  };
  const reviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setContent(value);
  };
  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };
  const onSumbitHandler = () => {
    const formData = new FormData();

    if (content === '')
      return showToast({
        title: '내용은 필수입니다.',
        description: '내용을 입력해주세요. 최대 255자',
      });
    formData.append(
      'trainerReviewData',
      new Blob(
        [JSON.stringify({ score, content, trainerId: Number(trainerId) })],
        {
          type: 'application/json',
        },
      ),
    );
    images.forEach((_) => {
      formData.append('images', _);
    });
    mutate(formData);
  };
  const { mutate } = useMutation({
    mutationFn: async (formData: FormData) => {
      await fetcher(`/trainerreview`, {
        method: 'POST',
        body: formData,
      });
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({
      //   queryKey: ['myPtProducts'],
      // });
      showToast({
        title: '등록 성공',
        lazy: true,
        description: '리뷰가 등록되었습니다.',
      });
      router.replace('/mypage/pt');
    },
    onError: () => {
      showToast({
        title: '등록 실패',
        lazy: true,
        description: '리뷰 등록에 실패했습니다.',
        type: 'danger',
      });
    },
  });

  if (isError) {
    showToast({
      title: '등록된 상품이 없습니다',
      description: '다른 상품을 골라주세요',
    });
    router.push('/pt');
  }
  if (isLoading) return <Loading />;
  if (!data) return null;

  return (
    <div className="flex  pb-24  gap-8">
      <div className="w-full flex flex-col gap-8">
        <h2 className="px-3 text-lg font-semibold">PT 상품</h2>
        <Accordion className="text-2xl" variant="splitted">
          {data.ptProducts ? (
            data.ptProducts.slice(0, 6).map((item: PtProduct) => (
              <AccordionItem
                key={item.ptProductId}
                aria-label={item.productName}
                classNames={{
                  title: 'text-2xl font-semibold text-mono_600',
                  subtitle: 'text-mono_400 py-1',
                  base: 'py-5 px-8',
                }}
                subtitle={formatCash(item.fee) + '원'}
                title={item.productName}
              >
                <PtProductDetailItem item={item} />
              </AccordionItem>
            ))
          ) : (
            <div>등록된 상품이 없습니다</div>
          )}
        </Accordion>

        <PtCardSection title="수상 내역">
          <div className="grid grid-cols-3 gap-4">
            {data?.trainer?.awards && data.trainer.awards.length > 0 ? (
              data.trainer.awards.map((item, index: number) => (
                <div
                  key={index}
                  className="w-full flex items-center px-3 gap-2"
                >
                  <TrophyIcon className="w-10 h-10 text-main" />
                  <div className="">
                    <p className="text-mono_600">
                      {item?.awardName}
                      <span className="text-mono_400"> ({item?.year})</span>
                    </p>
                    <p className="text-mono_400">{item.info}</p>
                  </div>
                  <div />
                </div>
              ))
            ) : (
              <p className="text-mono_600">수상내역이 없습니다 </p>
            )}
          </div>
        </PtCardSection>
        <PtCardSection title="헬스장 정보">
          <GymListCardItem gym={data?.gym!} />
        </PtCardSection>
        <PtCardSection title="PT 수강 후기">
          <div className="flex py-8 justify-between">
            <div className="flex items-center h-full gap-6">
              <p className="text-mono_700 text-5xl font-semibold">
                {data.trainer?.trainerScore}
              </p>
              <div className="flex flex-col h-full justify-between">
                <Star
                  readonly
                  h={'h-5'}
                  rate={data.trainer?.trainerScore}
                  w={'w-5'}
                />
                <p className="text-mono_400  text-sm">12개의 후기</p>
              </div>
            </div>
            <MyButton
              size="xl"
              startContent={<PencilIcon className="w-5 h-5 text-stone-100" />}
              onPress={() => (isOpen ? onClose() : onOpen())}
            >
              리뷰 작성하기
            </MyButton>
          </div>
        </PtCardSection>
        {isOpen && (
          <PtCardSection>
            <div className=" w-full flex gap-6 justify-between">
              <Textarea
                isClearable
                className=" w-full"
                description={
                  <MulitpleImageUploader
                    handleRemoveImage={handleRemoveImage}
                    images={images}
                  />
                }
                endContent={
                  <div className="flex items-end h-full">
                    <Star
                      h={'h-5'}
                      readonly={false}
                      w={'w-5'}
                      onChange={scoreChange}
                    />
                  </div>
                }
                max={255}
                placeholder="리뷰를 작성해주세요 255자 이내"
                startContent={
                  <label
                    className="relative h-full pr-3 cursor-pointer overflow-hidden flex items-start justify-center bg-transparent hover:bg-mono_50"
                    htmlFor="image-upload"
                  >
                    <PhotoIcon className="w-8 h-8 text-mono_400 group-hover:text-main transition" />
                    <input
                      multiple
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                      type="file"
                      onChange={handleImageUpload}
                    />
                  </label>
                }
                onChange={reviewChange}
              />
              <MyButton className="max-h-20" onPress={onSumbitHandler}>
                리뷰등록
              </MyButton>
            </div>
          </PtCardSection>
        )}

        <PtCardSection>
          <PtReviewItem />
        </PtCardSection>
      </div>

      <div className="h-full max-w-[320px] sticky  hidden md:block top-20 w-full">
        <div className="  ">
          <Card className="p-2 flex flex-col gap-2 w-full">
            <MainPtCard
              awards={data.trainer?.awards}
              backgroundImage={data.trainer?.profile ?? ''}
              content={data?.trainer?.trainerName ?? ''}
              id={String(data.trainer?.trainerId ?? '')}
              score={data.trainer?.trainerScore ?? 0}
              title={data.trainer?.trainerName ?? ''}
            />
            <MyButton
              onPress={() =>
                router.push(`/pt/${data.trainer?.trainerId}/reservation`)
              }
            >
              예약하기
            </MyButton>
          </Card>
        </div>
      </div>
    </div>
  );
}
