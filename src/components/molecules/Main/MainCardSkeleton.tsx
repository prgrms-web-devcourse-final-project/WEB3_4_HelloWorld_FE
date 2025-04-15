import { Skeleton } from '@heroui/react';

export default function MainPtCardSkeleton() {
  return (
    <Skeleton className="w-full rounded-lg p-4">
      <div className="h-36 bg-default-300 rounded-lg mb-4" />
      <div className="h-4 bg-default-200 rounded w-3/4 mb-2" />
      <div className="h-3 bg-default-200 rounded w-1/2" />
    </Skeleton>
  );
}
