import React from 'react';
import { Modal, ModalBody } from '@heroui/react';

export default function Backdrop({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Modal isOpen backdrop="blur">
        <ModalBody>{children}</ModalBody>
      </Modal>
    </>
  );
}
