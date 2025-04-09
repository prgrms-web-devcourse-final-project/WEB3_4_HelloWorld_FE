import MainPtCard from '@/components/molecules/Main/MainPtCard';

export default function PtCardList({ items }: { items: any[] }) {
  return (
    <div className="grid justify-items-center auto-cols-auto grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4">
      {items.map((item, index) => (
        <MainPtCard
          key={index}
          backgroundImage={''}
          content={
            'pt는 아무데서나 받으시면 안됩니다. 전문가와 상담하고 지금 바로 나의 바디를 체인지 해보세요 지금 바로 나의 바디를 체인지 해보세요 '
          }
          title={'김호석 트레이너'}
        />
      ))}
    </div>
  );
}
