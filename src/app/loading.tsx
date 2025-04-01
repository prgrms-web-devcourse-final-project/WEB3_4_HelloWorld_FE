'use client';
import React from 'react';
import { Spinner } from '@heroui/react';

export default function loading() {
  return (
    <>
      <Spinner color="danger" size="lg" />{' '}
    </>
  );
}
