'use client';

import Modal from '@/components/atoms/Modal';
import ThumbsSwiper from '@/components/atoms/ThumbsSwiper';
import PtLayout from '@/components/templates/PtTemplate/PtLayout';

export default function PtDetailPage() {
  const imageList = [
    'https://www.qplace.kr/content/images/2022/04/1-11.jpg',
    'https://www.qplace.kr/content/images/2022/04/1-11.jpg',
    'https://www.qplace.kr/content/images/2022/04/1-11.jpg',
    'https://www.qplace.kr/content/images/2022/04/1-11.jpg',
    'https://www.qplace.kr/content/images/2022/04/1-11.jpg',
    'https://www.qplace.kr/content/images/2022/04/1-11.jpg',
  ];

  return (
    <PtLayout>
      <Modal size="5xl">
        <div className="py-10 px-10">
          <ThumbsSwiper images={imageList} />
        </div>
      </Modal>
    </PtLayout>
  );
}
