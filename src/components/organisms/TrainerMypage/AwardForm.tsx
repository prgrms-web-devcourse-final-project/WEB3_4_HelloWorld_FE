'use client';

import { useState } from 'react';
import { Input, Textarea, Button, Card } from '@heroui/react';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';

import fetcher from '@/utils/apiInstance';
import useToast from '@/hooks/useToast';
import useAwardMutation from '@/hooks/useAwardMutation';
interface Award {
  awardYear: string;
  awardName: string;
  awardInfo: string;
  awardId?: number;
}

export default function AwardForm() {
  const { showToast } = useToast();
  const [awards, setAwards] = useState<Award[]>([]);
  const [formData, setFormData] = useState<Award>({
    awardYear: '',
    awardName: '',
    awardInfo: '',
  });

  const handleChange = (key: keyof Award, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddAward = () => {
    if (!formData.awardYear || !formData.awardName) {
      showToast({
        title: '입력 오류',
        description: '년도와 상 이름은 필수입니다.',
        type: 'danger',
      });

      return;
    }

    createAward(formData);
  };

  const removeAward = (index: number) => {
    deleteAward(index);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['award', 'get'],
    queryFn: async () => {
      const response = await fetcher<Award[]>(`/trainer/award`, {
        method: 'GET',
      });

      return response;
    },
  });
  const { mutate: createAward } = useAwardMutation('create');

  const { mutate: deleteAward } = useAwardMutation('delete');

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Input
          label={'수상내역'}
          labelPlacement="outside"
          placeholder="년도 (예: 2023)"
          value={formData.awardYear}
          onChange={(e) => handleChange('awardYear', e.target.value)}
        />
        <Input
          label={' '}
          labelPlacement="outside"
          placeholder="수상 이름"
          value={formData.awardName}
          onChange={(e) => handleChange('awardName', e.target.value)}
        />
      </div>
      <Textarea
        placeholder="간단한 소개"
        value={formData.awardInfo}
        onChange={(e) => handleChange('awardInfo', e.target.value)}
      />
      <Button className="w-fit" type="button" onPress={() => handleAddAward()}>
        <PlusIcon className="w-4 h-4 mr-1" />
        수상 내역 추가
      </Button>

      {data && (
        <div className="flex flex-col gap-3">
          {data?.map((award, index) => (
            <Card key={index} className="p-4 relative">
              <div className="absolute top-2 flex gap-2 right-2">
                <Button
                  isIconOnly
                  size="sm"
                  startContent={<TrashIcon className="w-5 h-5 text-main" />}
                  variant="ghost"
                  onPress={() => removeAward(award.awardId!)}
                />
              </div>
              <h4 className="font-semibold text-base">
                {award.awardYear} - {award.awardName}
              </h4>
              <p className="text-sm text-gray-600">{award.awardInfo}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
