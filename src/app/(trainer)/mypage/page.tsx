'use client';

import Dashboard from '@/components/organisms/TrainerMypage/Dashboard';
import { useInitUser } from '@/hooks/useInitUser';

export default function MyPage() {
  useInitUser();

  return (
    <div>
      <Dashboard />
    </div>
  );
}
