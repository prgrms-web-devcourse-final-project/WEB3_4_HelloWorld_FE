// src/constants/dummyGymDetailData.ts

import { Trainer } from '@/components/molecules/GymTrainerSection';

interface GymDetail {
  gym: {
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
    facilities: {
      parking: boolean;
      showerRoom: boolean;
      inbody: boolean;
      locker: boolean;
      wifi: boolean;
      sportswear: boolean;
      towel: boolean;
      sauna: boolean;
    };
  };
  reviews: {
    reviewId: number;
    score: number;
    content: string;
    reviewImages: string[];
  }[];
  machines: {
    machineId: number;
    name: string;
    type: string;
    machineImages: string[];
  }[];
  gymProducts: {
    productId: number;
    productName: string;
    productPrice: number;
    productMonth: number;
    canBuyOnline: boolean;
  }[];
  gymImages: string[];
  trainers: Trainer[];
}

export const dummyGymDetailData: Record<number, GymDetail> = {
  1: {
    gym: {
      gymId: 1,
      gymName: '헬스킹짐',
      startTime: '06:00',
      endTime: '22:00',
      phoneNumber: '02-1234-5678',
      address: '서울 강남구 테헤란로 123',
      xField: '37.123456',
      yField: '127.987654',
      avgScore: 4.5,
      intro: '헬스장에 대한 소개입니다',
      isPartner: true,
      facilities: {
        parking: true,
        showerRoom: true,
        inbody: false,
        locker: true,
        wifi: true,
        sportswear: false,
        towel: true,
        sauna: false,
      },
    },
    reviews: [
      {
        reviewId: 101,
        score: 5.0,
        content: '시설이 깨끗하고 좋아요!',
        reviewImages: ['/gym/review/review1.jpg'],
      },
      {
        reviewId: 102,
        score: 4.0,
        content: '기구가 많아서 좋아요!',
        reviewImages: [],
      },
    ],
    machines: [
      {
        machineId: 301,
        name: '벤치프레스',
        type: '웨이트 트레이닝',
        machineImages: ['/gym/equipment/benchpress.jpg'],
      },
      {
        machineId: 302,
        name: '런닝머신',
        type: '유산소 운동',
        machineImages: ['/gym/equipment/treadmill.jpg'],
      },
      {
        machineId: 302,
        name: '런닝머신',
        type: '유산소 운동',
        machineImages: ['/gym/equipment/treadmill.jpg'],
      },
      {
        machineId: 302,
        name: '런닝머신',
        type: '유산소 운동',
        machineImages: ['/gym/equipment/treadmill.jpg'],
      },
      {
        machineId: 302,
        name: '런닝머신',
        type: '유산소 운동',
        machineImages: ['/gym/equipment/treadmill.jpg'],
      },
    ],
    gymProducts: [
      {
        productId: 201,
        productName: '1개월 이용권',
        productPrice: 50000,
        productMonth: 1,
        canBuyOnline: true,
      },
      {
        productId: 202,
        productName: '3개월 이용권',
        productPrice: 130000,
        productMonth: 3,
        canBuyOnline: true,
      },
    ],
    gymImages: [
      '/gym/equipment/benchpress.jpg',
      '/gym/equipment/treadmill.jpg',
    ],
    trainers: [
      {
        name: '남궁혁',
        description:
          '재밌게 운동하는 법을 가르칩니다! 최고보다는 최선을, 포기보다는 실패를',
        price: '30,000',
        specialty: '바디프로필, 다이어트',
        career: '6년 이상',
        awards: '전국 피트니스 대회 1위',
        image: '/gym/trainers/trainer1.jpg',
      },
      {
        name: '남궁혁',
        description:
          '재밌게 운동하는 법을 가르칩니다! 최고보다는 최선을, 포기보다는 실패를',
        price: '30,000',
        specialty: '바디프로필, 다이어트',
        career: '6년 이상',
        awards: '전국 피트니스 대회 1위',
        image: '/gym/trainers/trainer1.jpg',
      },
      {
        name: '남궁혁',
        description:
          '재밌게 운동하는 법을 가르칩니다! 최고보다는 최선을, 포기보다는 실패를',
        price: '30,000',
        specialty: '바디프로필, 다이어트',
        career: '6년 이상',
        awards: '전국 피트니스 대회 1위',
        image: '/gym/trainers/trainer1.jpg',
      },
      {
        name: '남궁혁',
        description:
          '재밌게 운동하는 법을 가르칩니다! 최고보다는 최선을, 포기보다는 실패를',
        price: '30,000',
        specialty: '바디프로필, 다이어트',
        career: '6년 이상',
        awards: '전국 피트니스 대회 1위',
        image: '/gym/trainers/trainer1.jpg',
      },
    ],
  },
};
