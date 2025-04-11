export type Trainer = {
  trainerId: number;
  trainerName: string;
  contact: string;
  email: string;
  gender: 'MALE' | 'FEMALE';
  profile: string | null;
  trainerScore?: number;
  awards?: Award[];
};
export type Award = {
  awardName: string;
  info: string;
  year: string;
};
export type Gym = {
  gymName: string;
  gymAddress: string;
  gymOpen: string;
  gymClose: string;
  gymScore: number;
  gymX: number;
  gymY: number;
  images: string[];
};

export type PtProduct = {
  ptProductId: number;
  productName: string;
  ptInfo: string;
  fee: number;
  images: string[];
};

export type PtDetailResponse = {
  trainer?: Trainer;
  gym?: Gym;
  ptProducts?: PtProduct[];
};
export type PtUpdateResponse = {
  trainer?: Trainer;
  gym?: Gym;
  ptProductId: number;
  productName: string;
  ptInfo: string;
  fee: number;
  images: string[];
};
