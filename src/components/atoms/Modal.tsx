import { Modal as HerouiModal, ModalContent } from '@heroui/react';
interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: () => void;
  size?:
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | 'full'
    | 'xs'
    | '3xl'
    | '4xl'
    | '5xl';
}
export default function Modal({
  children,
  isOpen = false,
  onOpenChange,
  size = 'md',
}: ModalProps) {
  return (
    <>
      <HerouiModal isOpen={isOpen} size={size} onOpenChange={onOpenChange}>
        <ModalContent>{children}</ModalContent>
      </HerouiModal>
    </>
  );
}
