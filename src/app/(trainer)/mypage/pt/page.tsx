'use client';

import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';

import PtCardSection from '@/components/molecules/PT/PtCardSection';
import PtProductItem from '@/components/molecules/PT/PtProductItem';
import ScheduleTimeCheckGroup from '@/components/organisms/ScheduleTimeCheckGroup';

export default function PtPage() {
  //   const { data } = useQuery({
  //     queryKey: ['myPtProduct'],
  //     queryFn: async () => {
  //       const response = await fetcher('/ptProduct', {
  //         method: 'GET',
  //       });

  //       return response;
  //     },
  //   });

  //   useEffect(() => {
  //     console.log(data);
  //   }, [data]);
  const router = useRouter();

  return (
    <div className="flex flex-col gap-10">
      <PtCardSection title="피티 스케줄">
        <ScheduleTimeCheckGroup />
      </PtCardSection>
      <div className="w-full flex justify-between">
        <p className="text-large font-bold">나의 PT상품</p>
        <Button
          color="primary"
          onPress={() => router.push('/mypage/pt/registerpt')}
        >
          피티 상품 등록
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <PtProductItem
            key={index}
            amount={'100,000원'}
            image={'/gym/icons/healthboy.jpg'}
            info={'아무에게나 피티 받으시면 안됩니다.'}
            title={' 상품이름 '}
          />
        ))}
      </div>
    </div>
  );
}
