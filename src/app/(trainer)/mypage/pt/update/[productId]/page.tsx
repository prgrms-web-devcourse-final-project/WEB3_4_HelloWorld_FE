'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import TrainerPtProductForm from '@/components/organisms/TrainerMypage/TrainerPtProductForm';
import fetcher from '@/utils/apiInstance';
import { PtUpdateResponse } from '@/types/pt.types';
import Loading from '@/app/loading';

type Props = {
  productId: string;
};
export default function UpdatePtPage() {
  const param = useParams<Props>();
  const { data, isLoading } = useQuery({
    queryKey: ['PtProductDe'],
    queryFn: async () => {
      const response = await fetcher<PtUpdateResponse>(
        `/ptProduct/${param.productId}`,
        {
          method: 'GET',
          token: false,
        },
      );

      return response;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <TrainerPtProductForm
        isEditMode
        initialData={{
          ptProductId: data?.ptProductId,
          ptProductName: data?.productName,
          ptProductFee: data?.fee,
          info: data?.ptInfo,
          images: data?.images,
        }}
      />
    </>
  );
}
