'use client';
import Image from 'next/image';
import { TrashIcon } from '@heroicons/react/24/outline';

interface Props {
  images: File[];
  handleRemoveImage: (e: number) => void;
}
export default function MulitpleImageUploader({
  handleRemoveImage,
  images,
}: Props) {
  return (
    <div className="grid grid-cols-8 gap-4 py-2 ">
      {images.map((img, idx) => (
        <div
          key={idx}
          className="relative aspect-square w-full h-full rounded-md bg-white  "
        >
          <Image
            fill
            alt="업로드 이미지"
            className="object-cover"
            sizes="md"
            src={typeof img === 'string' ? img : URL.createObjectURL(img)}
          />
          <button
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
            onClick={() => handleRemoveImage(idx)}
          >
            <TrashIcon className="w-3 h-3 text-red-500" />
          </button>
        </div>
      ))}
    </div>
  );
}
