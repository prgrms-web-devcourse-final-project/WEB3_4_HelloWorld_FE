'use client';

import { useEffect, useState } from 'react';

import LessonHistoryTable from '@/components/molecules/Table';
import { fetchGymTickets } from '@/apis/gymTicketsApi';
import {
  mapGymTicketsToCommonHistory,
  CommonHistory,
} from '@/utils/mapGymTicketsToCommonHistory';

export default function CouponListHistory() {
  const [data, setData] = useState<CommonHistory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchGymTickets();
        const mapped = mapGymTicketsToCommonHistory(res.content);

        setData(mapped);
      } catch {
        alert('결제 내역 조회 실패');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-col items-start mb-[300px]">
      <h1 className="font-point text-2xl font-bold mb-2">
        나의 헬스장 등록 내역
      </h1>

      <div className="w-[1305px] h-[550px] mb-[300px] py-4">
        <LessonHistoryTable data={data} />
      </div>
    </div>
  );
}
