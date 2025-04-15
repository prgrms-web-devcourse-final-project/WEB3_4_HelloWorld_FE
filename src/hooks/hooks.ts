import { useQuery, useInfiniteQuery, useMutation } from '@tanstack/react-query';

import fetcher from '@/utils/apiInstance';
import { PtDetailResponse } from '@/types/pt.types';
import { TrainerReviewResponse } from '@/types/review';
import { ReservationResponse } from '@/types/reservation';

interface UseSubmitReviewMutationProps {
  onSuccess?: () => void;
  onError?: () => void;
}
export const usePtDetailQuery = (trainerId: string) =>
  useQuery({
    queryKey: ['ptProductDetail', trainerId],
    queryFn: () =>
      fetcher<PtDetailResponse>(`/ptProduct/trainer/${trainerId}`, {
        method: 'GET',
        token: false,
      }),
    staleTime: 0,
  });

export const useReservationQuery = (enabled: boolean) =>
  useQuery({
    queryKey: ['reservationMember'],
    queryFn: () =>
      fetcher<ReservationResponse>(`/reservation/member`, {
        method: 'GET',
        token: true,
      }),
    enabled,
    staleTime: 0,
  });

export const useReviewQuery = (trainerId: string) =>
  useInfiniteQuery({
    queryKey: ['ptProductReview', trainerId],
    queryFn: ({ pageParam = 0 }) =>
      fetcher<TrainerReviewResponse>(
        `/trainer/${trainerId}/review?size=5&page=${pageParam}`,
        {
          method: 'GET',
          token: false,
        },
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasNext ? allPages.length : undefined,
  });
export const useSubmitReviewMutation = ({
  onSuccess,
  onError,
}: UseSubmitReviewMutationProps) => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      await fetcher(`/trainerreview`, {
        method: 'POST',
        body: formData,
      });
    },
    onSuccess,
    onError,
  });
};
