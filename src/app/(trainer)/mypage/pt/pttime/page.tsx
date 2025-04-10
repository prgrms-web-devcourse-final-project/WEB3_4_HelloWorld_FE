'use client';
import PtCardSection from '@/components/molecules/PT/PtCardSection';
import ScheduleTimeCheckGroup from '@/components/organisms/ScheduleTimeCheckGroup';

export default function PtTimePage() {
  return (
    <div>
      <PtCardSection>
        <ScheduleTimeCheckGroup isReadOnly={false} />
      </PtCardSection>
    </div>
  );
}
