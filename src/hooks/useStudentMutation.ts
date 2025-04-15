import { useMutation, useQueryClient } from '@tanstack/react-query';

import fetcher from '@/utils/apiInstance';
import useToast from '@/hooks/useToast';
import { StudentResponse } from '@/types/student';

export default function useStudentMutation(onOpen?: () => void) {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (studentId: string): Promise<StudentResponse> => {
      const response = await fetcher<StudentResponse>(
        `/trainer/student/${studentId}`,
        { method: 'GET' },
      );

      return response;
    },
    onSuccess: (data, studentId) => {
      queryClient.setQueryData(['student', studentId], data);

      if (onOpen) {
        onOpen();
      }
    },
    onError: () => {
      showToast({
        title: '불러오기 실패',
        description: '수강생 불러오기에 실패했습니다.',
      });
    },
  });
}
