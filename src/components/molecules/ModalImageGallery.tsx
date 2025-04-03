import Modal from '@/components/atoms/Modal';
import ThumbsSwiper from '@/components/atoms/ThumbsSwiper';

interface ModalImageGalleryProps {
  imageList: string[];
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function ModalImageGallery({
  imageList,
  isOpen,
  onOpenChange,
}: ModalImageGalleryProps) {
  return (
    <Modal isOpen={isOpen} size="5xl" onOpenChange={onOpenChange}>
      <div className="py-10 px-10">
        <ThumbsSwiper images={imageList} />
      </div>
    </Modal>
  );
}
