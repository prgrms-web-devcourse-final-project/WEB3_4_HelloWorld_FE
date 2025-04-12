import { Image, useDisclosure } from '@heroui/react';

import ModalImageGallery from '../ModalImageGallery';

import { PtProduct } from '@/types/pt.types';

export default function PtProductDetailItem({ item }: { item: PtProduct }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="grid grid-cols-4 gap-4">
        {item.images.slice(0, 8).map((image: string, index: number) => (
          <div key={index} className=" w-full h-full relative">
            <Image
              className="w-full aspect-square h-full object-cover"
              loading="lazy"
              src={image}
            />

            {index === 7 && (
              <div className="absolute cursor-pointer rounded-medium hover:bg-stone-700 transition-all duration-300 inset-0 z-50 left-0 top-0 w-full h-full bg-black/50 flex justify-center items-center">
                <button
                  className="text-white w-full h-full text-2xl font-bold"
                  onClick={onOpen}
                >
                  더보기
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-mono_700 text-base  font-medium whitespace-pre">
        {item.ptInfo}
      </p>
      <ModalImageGallery
        imageList={item.images}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
