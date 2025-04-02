import LessonHistoryTable from '@/components/molecules/Table';
import { PAYMENT_HISTORY_MOCK } from '@/components/templates/MemberMypageTemplate/contents/couponHostory';

export default function CouponListHistory() {
  return (
    <div className="w-full flex flex-col items-start mb-[300px]">
      <h1 className="font-point text-2xl font-bold mb-2">나의 결제 내역</h1>

      <div className="w-[1305px] h-[550px] mb-[300px] py-4">
        <LessonHistoryTable data={PAYMENT_HISTORY_MOCK} />
      </div>
    </div>
  );
}
