'use client';

interface LoginTabProps {
  selectedTab: 'user' | 'trainer';
  setSelectedTab: (value: 'user' | 'trainer') => void;
}

const LoginTab = ({ selectedTab, setSelectedTab }: LoginTabProps) => (
  <div className="flex w-[448px] h-[50px] overflow-hidden">
    <button
      className={`flex-1 font-semibold transition-colors ${
        selectedTab === 'user'
          ? 'bg-main text-main-foreground dark:bg-primary dark:text-primary-foreground rounded-l-md'
          : 'bg-mono_000 text-foreground dark:bg-mono_000 dark:text-foreground border border-mono_200 dark:border-mono_200 rounded-l-md'
      }`}
      onClick={() => setSelectedTab('user')}
    >
      일반 로그인
    </button>
    <button
      className={`flex-1 font-semibold transition-colors ${
        selectedTab === 'trainer'
          ? 'bg-main text-main-foreground dark:bg-primary dark:text-primary-foreground rounded-r-md'
          : 'bg-mono_000 text-foreground dark:bg-mono_000 dark:text-foreground border border-mono_200 dark:border-mono_200 rounded-r-md'
      }`}
      onClick={() => setSelectedTab('trainer')}
    >
      선생님 로그인
    </button>
  </div>
);

export default LoginTab;
