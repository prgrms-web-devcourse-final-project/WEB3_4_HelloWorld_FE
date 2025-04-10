import PtProduct from '@/components/organisms/PT/PtProduct';
import PtLayout from '@/components/templates/PtTemplate/PtLayout';
import fetcher from '@/utils/apiInstance';

export default async function PtPage() {
  const response = await fetcher('/ptProduct', {
    method: 'GET',
  });

  return (
    <PtLayout>
      <PtProduct ptProduct={response} />
    </PtLayout>
  );
}
