import PtProduct from '@/components/organisms/PT/PtProduct';
import PtLayout from '@/components/templates/PtTemplate/PtLayout';
import fetcher from '@/utils/apiInstance';

type Props = {
  searchParams: {
    page?: string;
    sortOption?:
      | 'latest'
      | 'score'
      | 'nearby'
      | 'trainer'
      | 'ptProduct'
      | 'district';
    searchTerm?: string;
  };
};

export default async function PtPage({ searchParams }: Props) {
  const defaultParams = {
    pageSize: '12',
  };

  const allParams = new URLSearchParams({
    ...defaultParams,
    ...(searchParams as Record<string, string>),
  });

  const response = await fetcher(`/ptProduct?${allParams.toString()}`, {
    method: 'GET',
    cache: 'no-store',
  });

  return (
    <PtLayout>
      <PtProduct ptProduct={response} />
    </PtLayout>
  );
}
