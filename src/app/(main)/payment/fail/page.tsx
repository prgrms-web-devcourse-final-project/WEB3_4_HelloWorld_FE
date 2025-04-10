'use client';

import { useSearchParams } from 'next/navigation';

const PaymentFailPage = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const message = searchParams.get('message');

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
      <h1 className="text-2xl font-bold mb-4"> 결제에 실패하였습니다.</h1>
      <p className="text-sm mb-2">아래 사유를 확인 후 다시 시도해주세요.</p>
      <div className="text-sm space-y-2">
        <p>
          <strong>실패 코드:</strong> {code}
        </p>
        <p>
          <strong>실패 메시지:</strong> {message}
        </p>
      </div>
    </div>
  );
};

export default PaymentFailPage;
