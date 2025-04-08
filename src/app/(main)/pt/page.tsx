'use client';

import { useEffect } from 'react';

import PtProduct from '@/components/organisms/PT/PtProduct';
import PtLayout from '@/components/templates/PtTemplate/PtLayout';
import { useMemberStore } from '@/stores/testAuthStore';

export default function PtPage() {
  const { user, userType } = useMemberStore();

  useEffect(() => {
    console.log(user);
    console.log(user);
  }, [user]);

  return (
    <PtLayout>
      <PtProduct />
    </PtLayout>
  );
}
