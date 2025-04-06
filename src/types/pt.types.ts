// 수상 내역 타입
interface Award {
  year: string;
  awardName: string;
  info: string;
}

// 트레이너 정보 타입
interface Trainer {
  trainerId: number;
  trainerName: string;
  gender: 'Male' | 'Female';
  profile: string;
  contact: string;
  email: string;
  trainerScore: number;
  awards: Award[];
}

// 헬스장 정보 타입
interface Gym {
  gymName: string;
  gymAddress: string;
  gymX: string;
  gymY: string;
  gymOpen: string;
  gymClose: string;
  gymScore: number;
  images: string[];
}

// PT 상품 정보 타입
interface PtProduct {
  ptProductId: number;
  trainer: Trainer;
  ptInfo: string;
  fee: number;
  images: string[];
  gym: Gym;
}
