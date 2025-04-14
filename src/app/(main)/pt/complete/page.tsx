'use client';
import { Card, CardHeader, Image } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Section from '@/components/atoms/Section';
import { MyButton } from '@/components/atoms/Button';

export default function CompletePage() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      router.replace('/mypage'); // 원하는 경로로 변경
    }, 5000);

    return () => {
      clearInterval(countdown);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <div className="py-52">
        <Section>
          <Card className="py-5">
            <CardHeader>
              <div className=" w-full flex flex-col gap-10 py-10 items-center justify-center">
                <Image className="max-w-80" src="/gym/icons/healthboy.jpg" />
                <h1 className="text-3xl font-bold text-mono_600">
                  예약이 완료되었습니다!
                </h1>
              </div>
            </CardHeader>
            <div className=" w-full flex flex-col items-center justify-center">
              <p>항상 짐 메이트를 이용해주셔서 감사드립니다</p>
              <strong>짐 메이트와 함께하는 운동, 지금부터 시작입니다</strong>
              <p className="mt-4 text-sm text-gray-400">
                {seconds}초 후 마이페이지로 이동합니다...
              </p>
            </div>
            <div className="w-full flex justify-center gap-3 py-3">
              <MyButton onPress={() => router.replace('/')}>홈으로</MyButton>
              <MyButton onPress={() => router.replace('/membermypage')}>
                마이페이지로
              </MyButton>
            </div>
          </Card>
        </Section>
      </div>
    </>
  );
}
