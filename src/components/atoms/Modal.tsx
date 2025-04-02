import {
  Modal as HerouiModal,
  ModalContent,
  Button,
  useDisclosure,
} from '@heroui/react';

export default function Modal({
  children,
  size = 'md',
}: {
  children: React.ReactNode;
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
    | '5xl'
    | undefined;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <HerouiModal isOpen={isOpen} size={size} onOpenChange={onOpenChange}>
        <ModalContent>{children}</ModalContent>
      </HerouiModal>
    </>
  );
}
