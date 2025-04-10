'use client';
import React from 'react';
import { Spinner } from '@heroui/react';

export default function loading() {
  return (
    <>
      <div className="flex w-full justify-center items-center h-screen">
        <Spinner color="danger" size="lg" />{' '}
      </div>
    </>
  );
}
