'use client';

import { useState } from 'react';

const LoginTab = () => {
  const [selected, setSelected] = useState<'user' | 'trainer'>('user');

  return (
    <div className="flex w-[448px] h-[50px] overflow-hidden">
      <button
        onClick={() => setSelected('user')}
        className={`flex-1 font-semibold transition-colors ${
          selected === 'user'
            ? 'bg-main text-main-foreground dark:bg-primary dark:text-primary-foreground rounded-l-md'
            : 'bg-mono_000 text-foreground dark:bg-mono_000 dark:text-foreground border border-mono_200 dark:border-mono_200 rounded-l-md'
        }`}
      >
        일반 로그인
      </button>
      <button
        onClick={() => setSelected('trainer')}
        className={`flex-1 font-semibold transition-colors ${
          selected === 'trainer'
            ? 'bg-main text-main-foreground dark:bg-primary dark:text-primary-foreground rounded-r-md'
            : 'bg-mono_000 text-foreground dark:bg-mono_000 dark:text-foreground border border-mono_200 dark:border-mono_200 rounded-r-md'
        }`}
      >
        선생님 로그인
      </button>
    </div>
  );
};

export default LoginTab;
