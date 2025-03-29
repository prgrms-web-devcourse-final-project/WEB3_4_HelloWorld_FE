'use client';

import { Checkbox } from '@nextui-org/react';

interface TrainerTemplateProps {
  selectedTrainerRole: 'owner' | 'trainer' | null;
  setSelectedTrainerRole: (role: 'owner' | 'trainer') => void;
}

const TrainerTemplate = ({
  selectedTrainerRole,
  setSelectedTrainerRole,
}: TrainerTemplateProps) => (
  <div className="flex gap-x-6 mb-[40px]">
    <Checkbox
      isSelected={selectedTrainerRole === 'owner'}
      onClick={() => setSelectedTrainerRole('owner')}
      color="primary"
    >
      헬스장 사장님
    </Checkbox>
    <Checkbox
      isSelected={selectedTrainerRole === 'trainer'}
      onClick={() => setSelectedTrainerRole('trainer')}
      color="primary"
    >
      헬스장 직원
    </Checkbox>
  </div>
);

export default TrainerTemplate;
