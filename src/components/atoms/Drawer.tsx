import {
  Drawer as DrawerComponent,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from '@heroui/react';

export default function Drawer({
  children,
  onAction,
  title,
  isOpen,
  size = 'md',
  onOpenChange,
}: {
  children: React.ReactNode;
  onAction: () => void;
  title: string;
  isOpen: boolean;
  size:
    | 'md'
    | 'sm'
    | 'lg'
    | 'xl'
    | '2xl'
    | 'xs'
    | '3xl'
    | '4xl'
    | '5xl'
    | 'full'
    | undefined;
  onOpenChange: (isOpen: boolean) => void;
}) {
  return (
    <>
      <DrawerComponent isOpen={isOpen} size={size} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                {title}
              </DrawerHeader>
              <DrawerBody>{children}</DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  닫기
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </DrawerComponent>
    </>
  );
}
