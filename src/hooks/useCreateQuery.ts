'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const useCreateQuery = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const createQueryStrings = useCallback(
    (paramsObj: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(paramsObj).forEach(([key, value]) => {
        params.set(key, value);
      });

      router.push(`?${params.toString()}`);
    },
    [searchParams],
  );

  return createQueryStrings;
};

export default useCreateQuery;
