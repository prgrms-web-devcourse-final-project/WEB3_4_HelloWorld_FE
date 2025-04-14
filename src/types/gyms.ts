// gym 페이지 전체 타입 정의
export interface GymData {
  gymId: number;
  gymData?: GymData;
  gymName: string;
  startTime: string;
  endTime: string;
  address: string;
  xField: string;
  yField: string;
  avgScore: number;
  isPartner: boolean;
  thumbnailImage: string;
  phone?: string;
}

export interface GymProductResponse {
  gymProductId: number;
  gymProductMonth: number;
  gymProductFee: number;
}

export interface GymDetailResponse {
  gymId: number;
  gymName: string;
  startTime: string;
  endTime: string;
  phoneNumber: string;
  address: string;
  xField: string;
  yField: string;
  avgScore: number;
  intro: string;
  isPartner: boolean;
  gymImages: string[];
  gymProductResponses: {
    gymProductId: number;
    gymProductMonth: number;
    gymProductFee: number;
    productName: string;
    productPrice: number;
  }[];
  gymMachines: {
    name: string;
    machineImages: string[];
  }[];
  gymReviews: {
    reviewId: number;
    score: number;
    reviewImages: string[];
    content: string;
  }[];
}

export type FetchGymDetailApi = (gymId: number) => Promise<GymDetailResponse>;

export interface GymTrainer {
  trainerId: number;
  name: string;
  profileImage: string;
  description: string;
}

export interface MachineResponse {
  machineName: string;
  amount: number;
  machineImage: string;
}

export interface GymFacilityResponse {
  towel: boolean;
  showerRoom: boolean;
  parking: boolean;
  sauna: boolean;
  locker: boolean;
  sportswear: boolean;
  wifi: boolean;
  inbody: boolean;
  machineResponses?: MachineResponse[];
  gymMachines?: {
    name: string;
    count: number;
    image: string;
  }[];
}

export interface GymTrainer {
  trainerName: string;
  intro: string;
  field: string;
  career: string;
  profileUrl: string;
  ptProducts: {
    ptProductName: string;
    ptProductFee: number;
  }[];
  awards: {
    awardYear: string;
    awardName: string;
    awardInfo: string;
  }[];
}
