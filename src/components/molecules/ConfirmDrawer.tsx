'use client';

import { Fragment, memo } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from '@heroui/react';

interface ConfirmDrawerProps {
  title: string;
  message: string;
  isOpen: boolean;
  onOpenChange: () => void;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

const ConfirmDrawer = ({
  title,
  message,
  isOpen,
  onOpenChange,
  onConfirm,
  confirmLabel = '예',
  cancelLabel = '아니오',
  placement = 'top',
}: ConfirmDrawerProps) => (
  <Drawer isOpen={isOpen} placement={placement} onOpenChange={onOpenChange}>
    <DrawerContent>
      {(onClose) => (
        <Fragment>
          <DrawerHeader className="text-base font-semibold">
            {title}
          </DrawerHeader>
          <DrawerBody>
            <p className="text-sm text-mono_500">{message}</p>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="light" onPress={onClose}>
              {cancelLabel}
            </Button>
            <Button
              color="primary"
              onPress={() => {
                onConfirm();
                onClose();
              }}
            >
              {confirmLabel}
            </Button>
          </DrawerFooter>
        </Fragment>
      )}
    </DrawerContent>
  </Drawer>
);

export default memo(ConfirmDrawer);
