'use client';

import PtProductItem from '@/components/molecules/PT/PtProductItem';

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

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <PtProductItem
          amount={'100'}
          image={''}
          info={''}
          title={' 트레이너 이름 '}
        />
        <PtProductItem
          amount={'100'}
          image={''}
          info={''}
          title={' 트레이너 이름 '}
        />
        <PtProductItem
          amount={'100'}
          image={''}
          info={''}
          title={' 트레이너 이름 '}
        />
        <PtProductItem
          amount={'100'}
          image={''}
          info={''}
          title={' 트레이너 이름 '}
        />
        <PtProductItem
          amount={'100'}
          image={''}
          info={''}
          title={' 트레이너 이름 '}
        />
        <PtProductItem
          amount={'100'}
          image={''}
          info={''}
          title={' 트레이너 이름 '}
        />
      </div>
    </div>
  );
}
