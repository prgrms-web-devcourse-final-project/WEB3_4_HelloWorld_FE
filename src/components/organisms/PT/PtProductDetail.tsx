'use client';
import { Card } from '@heroui/card';
import { Accordion, AccordionItem } from '@heroui/react';
import { PencilIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';

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

export default function PtProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['ptProductDetail'],
    queryFn: async () => {
      const response = await fetcher<PtDetailResponse>(
        `/ptProduct/trainer/${params.trainerId}`,
        {
          method: 'GET',
          token: false,
        },
      );

      return response;
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
            >
              리뷰 작성하기
            </MyButton>
          </div>
        </PtCardSection>
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
