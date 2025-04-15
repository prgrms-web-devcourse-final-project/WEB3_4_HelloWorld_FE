import { useMutation, useQueryClient } from '@tanstack/react-query';

import fetcher from '@/utils/apiInstance';
import useToast from '@/hooks/useToast';

export interface Award {
  awardYear: string;
  awardName: string;
  awardInfo: string;
  awardId?: number;
}

type ActionType = 'create' | 'update' | 'delete';

export default function useAwardMutation(action: ActionType) {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Award | number) => {
      let method: 'POST' | 'PUT' | 'DELETE' = 'POST';
      let url = '/trainer/award';

      if (action === 'update') {
        method = 'PUT';
      } else if (action === 'delete') {
        method = 'DELETE';
        url = `/trainer/award/${data}`;
      }

      await fetcher(url, {
        method,
        body: action !== 'delete' ? JSON.stringify(data) : undefined,
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess: () => {
      const message =
        action === 'create'
          ? '수상 내역이 등록되었습니다.'
          : action === 'update'
            ? '수상 내역이 수정되었습니다.'
            : '수상 내역이 삭제되었습니다.';

      showToast({
        title: '완료',
        description: message,
      });

      queryClient.invalidateQueries({ queryKey: ['award', 'get'] });
    },
    onError: () => {
      showToast({
        title: '실패',
        description: '다시 시도해주세요.',
        type: 'danger',
      });
    },
  });
}
