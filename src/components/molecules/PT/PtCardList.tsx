import MainPtCard from '@/components/molecules/Main/MainPtCard';

export default function PtCardList({ items }: { items: any[] }) {
  return (
    <div className="grid justify-items-center auto-cols-auto grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4">
      {items.map((item, index) => (
        <MainPtCard
          key={index}
          backgroundImage={item.trainer.profile}
          content={item.info}
          id={item.trainer.trainerId}
          productName={item.productName}
          ptProductFee={item.ptProductFee}
          score={item.trainer.score}
          title={item.trainer.trainerName}
        />
      ))}
    </div>
  );
}
