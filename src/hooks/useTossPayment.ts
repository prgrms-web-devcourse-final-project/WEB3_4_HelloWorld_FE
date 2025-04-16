'use client';

import type { UserData } from '@/types/UserData';

import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface TossPaymentParams {
  orderName: string;
  amount: number;
}

export const useTossPayment = (userInfo: UserData | null) => {
  const [isTossReady, setIsTossReady] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://js.tosspayments.com/v1/payment';
    script.async = true;
    script.onload = () => setIsTossReady(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const requestTossPayment = async ({
    orderName,
    amount,
  }: TossPaymentParams) => {
    const toss = (window as any).TossPayments;
    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;

    if (!toss || !clientKey) return;

    const paymentWidget = toss(clientKey);
    const orderId = uuidv4();

    try {
      await paymentWidget.requestPayment('카드', {
        amount,
        orderId,
        orderName,
        customerName: userInfo?.memberName ?? '비회원',
        customerEmail: userInfo?.email ?? 'unknown@example.com',
        successUrl: `${window.location.origin}/payment/success?orderId=${orderId}`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch {}
  };

  return { isTossReady, requestTossPayment };
};
