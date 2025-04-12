import PtProductDetail from '@/components/organisms/PT/PtProductDetail';
import PtLayout from '@/components/templates/PtTemplate/PtLayout';
export const dynamic = 'force-dynamic';

export default async function PtDetailPage() {
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/ptProduct/trainer/5`,
  //   {
  //     method: 'GET',
  //     cache: 'force-cache',
  //   },
  // );

  // console.log(response.json());

  return (
    <PtLayout>
      <PtProductDetail />
    </PtLayout>
  );
}
