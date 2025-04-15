import Modal from '../atoms/Modal';
import ThumbsSwiper from '../atoms/ThumbsSwiper';

type ImageItem = string | { imageUrl: string; imageId: number };

interface ModalImageGalleryProps {
  imageList?: ImageItem[];
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function ModalImageGallery({
  imageList,
  isOpen,
  onOpenChange,
}: ModalImageGalleryProps) {
  // string[] 형태로 변환
  const imageUrls = imageList?.map((item) =>
    typeof item === 'string' ? item : item.imageUrl,
  );

  return (
    <Modal isOpen={isOpen} size="3xl" onOpenChange={onOpenChange}>
      <div className="py-10 px-10">
        <ThumbsSwiper images={imageUrls} />
      </div>
    </Modal>
  );
}
