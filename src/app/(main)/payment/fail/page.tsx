'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { XCircleIcon } from '@heroicons/react/24/solid';

const PaymentFailPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');
  const message = searchParams.get('message');

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <div className="bg-mono_100 rounded-2xl shadow-lg p-10 w-full max-w-md text-center ">
        <XCircleIcon className="h-16 w-16 text-danger mx-auto mb-4 animate-pulse" />
        <h1 className="text-2xl font-bold text-danger mb-2">
          결제에 실패하였습니다.
        </h1>
        <p className="text-sm text-mono_800 mb-6">
          아래 사유를 확인하신 후 다시 시도해 주세요.
        </p>
        <div className="bg-mono_100 rounded-xl p-4 text-left space-y-3 text-sm text-mono_800">
          <p>
            <strong className="text-mono_900">실패 코드:</strong>{' '}
            {code ?? '없음'}
          </p>
          <p>
            <strong className="text-mono_900">실패 메시지:</strong>{' '}
            {message ?? '알 수 없는 오류'}
          </p>
        </div>
        <button
          className="mt-8 bg-main text-white font-bold px-6 py-2 rounded-md hover:opacity-90 transition"
          onClick={() => router.push('/')}
        >
          메인으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default PaymentFailPage;
