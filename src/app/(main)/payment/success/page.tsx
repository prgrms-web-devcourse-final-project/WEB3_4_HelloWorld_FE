'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

import Loading from '@/app/loading';
const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');
  const paymentKey = searchParams.get('paymentKey');
  const amount = searchParams.get('amount');

  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const hasRequested = useRef(false);

  useEffect(() => {
    const confirmPayment = async () => {
      if (hasRequested.current || !orderId || !paymentKey || !amount) return;

      hasRequested.current = true;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/confirm`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
              orderId,
              paymentKey,
              amount: Number(amount),
            }),
          },
        );

        res.ok ? setIsSuccess(true) : router.push('/payment/fail');
      } catch {
        router.push('/payment/fail');
      }
    };

    confirmPayment();
  }, [orderId, paymentKey, amount, router]);

  useEffect(() => {
    const fetchUserInfo = async () => {};

    fetchUserInfo();
  }, [isSuccess]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-black px-4">
      {isSuccess === true ? (
        <div className="bg-mono_100 rounded-2xl shadow-lg p-10 w-full max-w-md text-center">
          <CheckCircleIcon className="h-16 w-16 text-main mx-auto mb-4 animate-bounce" />
          <h1 className="text-2xl font-bold text-main mb-2">
            결제가 완료되었습니다!
          </h1>
          <p className="text-sm text-mono_800 mb-6">
            GymMate와 함께 건강한 목표를 이루어보세요 💪
          </p>
          <div className="bg-mono_100 rounded-xl p-4 text-left space-y-3 text-sm text-mono_800">
            <p>
              <strong className="text-mono_900">주문번호:</strong> {orderId}
            </p>
            <p>
              <strong className="text-mono_900">결제키:</strong> {paymentKey}
            </p>
            <p>
              <strong className="text-mono_900">결제금액:</strong>{' '}
              <span className="text-main font-semibold">{amount}원</span>
            </p>
          </div>
          <button
            className="mt-8 bg-main text-white font-bold px-6 py-2 rounded-md hover:opacity-90 transition"
            onClick={() => router.push('/')}
          >
            메인으로 돌아가기
          </button>
        </div>
      ) : isSuccess === false ? null : (
        <Loading />
      )}
    </div>
  );
};

export default PaymentSuccessPage;
