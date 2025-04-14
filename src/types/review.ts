export interface TrainerReviewImage {
  trainerReviewImageId: number;
  imageUrl: string; // 혹시 imageUrl 필드가 명시되어 있다면 추가
}

export interface TrainerReview {
  trainerReviewId: number;
  score: number;
  content: string;
  imageUrls: TrainerReviewImage[];
}

export interface TrainerReviewResponse {
  content: TrainerReview[];
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  isLast: boolean;
  totalElements: number;
  totalPages: number;
}
