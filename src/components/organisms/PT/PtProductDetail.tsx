import { Card } from '@heroui/card';
import { Accordion, AccordionItem } from '@heroui/react';

import MainPtCard from '@/components/molecules/Main/MainPtCard';
import { MyButton } from '@/components/atoms/Button';
import PtProductDetailItem from '@/components/molecules/PT/PtProductDetailItem';

export default function PtProductDetail() {
  const items = [
    {
      key: '1',
      title: 'PT 10회 풀 패키지',
      content: '트레이너 소개 내용',
      subtitle: '10회 풀 패키지',
      images: [
        'https://cdn.jbnews.com/news/photo/202312/1417523_1233320_5953.jpg',
        'https://cdn.jbnews.com/news/photo/202312/1417523_1233320_5953.jpg',
        'https://cdn.jbnews.com/news/photo/202312/1417523_1233320_5953.jpg',
        'https://cdn.jbnews.com/news/photo/202312/1417523_1233320_5953.jpg',
        'https://cdn.jbnews.com/news/photo/202312/1417523_1233320_5953.jpg',
        'https://cdn.jbnews.com/news/photo/202312/1417523_1233320_5953.jpg',
        'https://cdn.jbnews.com/news/photo/202312/1417523_1233320_5953.jpg',
        'https://cdn.jbnews.com/news/photo/202312/1417523_1233320_5953.jpg',
        'https://cdn.jbnews.com/news/photo/202312/1417523_1233320_5953.jpg',
        'https://cdn.jbnews.com/news/photo/202312/1417523_1233320_5953.jpg',
        'https://cdn.jbnews.com/news/photo/202312/1417523_1233320_5953.jpg',
        'https://cdn.jbnews.com/news/photo/202312/1417523_1233320_5953.jpg',
      ],
    },
    {
      key: '2',
      title: 'PT 20회 풀 패키지',
      content: '트레이너 소개 내용',
      subtitle: '20회 풀 패키지',
      images: [
        'https://www.hsuco.or.kr/sports/File/Download/79b8474ed11e47c9c7bc3b6b3e7af76d',
        'https://www.hsuco.or.kr/sports/File/Download/79b8474ed11e47c9c7bc3b6b3e7af76d',
        'https://www.hsuco.or.kr/sports/File/Download/79b8474ed11e47c9c7bc3b6b3e7af76d',
      ],
    },
    {
      key: '3',
      title: 'PT 20회 풀 패키지',
      content: '트레이너 소개 내용',
      subtitle: '30회 풀 패키지',
      images: [
        'https://www.hsuco.or.kr/sports/File/Download/79b8474ed11e47c9c7bc3b6b3e7af76d',
        'https://www.hsuco.or.kr/sports/File/Download/79b8474ed11e47c9c7bc3b6b3e7af76d',
        'https://www.hsuco.or.kr/sports/File/Download/79b8474ed11e47c9c7bc3b6b3e7af76d',
      ],
    },
  ];

  return (
    <div className="flex  h-[2000px] gap-8">
      <Accordion className="text-2xl" variant="splitted">
        {items.map((item) => (
          <AccordionItem
            key={item.key}
            aria-label={item.title}
            classNames={{
              title: 'text-2xl font-semibold text-mono_600',
              subtitle: 'text-mono_400 py-1',
              base: 'py-5 px-8',
            }}
            subtitle={item.subtitle}
            title={item.title}
          >
            <PtProductDetailItem item={item} />
          </AccordionItem>
        ))}
      </Accordion>
      <div className="h-full max-w-[320px] relative w-full">
        <div className=" sticky top-20">
          <Card className="p-2 flex flex-col gap-2 w-full">
            <MainPtCard backgroundImage={''} content={'dd'} title={'dd'} />
            <MyButton>예약하기</MyButton>
          </Card>
        </div>
      </div>
    </div>
  );
}
