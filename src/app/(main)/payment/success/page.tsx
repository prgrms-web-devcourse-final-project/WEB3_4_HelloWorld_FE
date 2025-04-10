'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

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

        if (res.ok) {
          setIsSuccess(true);
        } else {
          router.push('/payment/fail');
        }
      } catch {
        router.push('/payment/fail');
      }
    };

    confirmPayment();
  }, [orderId, paymentKey, amount, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
      {isSuccess === true ? (
        <>
          <h1 className="text-2xl font-bold mb-4">
            결제가 완료되었습니다! 이용해 주셔서 감사합니다.
          </h1>
          <div className="text-sm space-y-2">
            <p>
              <strong>주문번호:</strong> {orderId}
            </p>
            <p>
              <strong>결제키:</strong> {paymentKey}
            </p>
            <p>
              <strong>결제금액:</strong> {amount}원
            </p>
          </div>
        </>
      ) : isSuccess === false ? null : (
        <h1 className="text-xl font-semibold">결제를 확인 중입니다...</h1>
      )}
    </div>
  );
};

export default PaymentSuccessPage;
