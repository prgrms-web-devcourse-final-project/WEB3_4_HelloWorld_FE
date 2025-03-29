'use client';
import React from 'react';
import { Spinner } from '@heroui/react';

import Overlay from '../components/molecules/Overlay';

export default function loading() {
  return (
    <>
      <Overlay>
        <Spinner color="danger" size="lg" />{' '}
      </Overlay>
    </>
  );
}
