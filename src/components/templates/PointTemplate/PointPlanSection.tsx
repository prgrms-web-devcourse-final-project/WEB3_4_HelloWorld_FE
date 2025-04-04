'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const PointPlanSection = () => {
  const [activeTab, setActiveTab] = useState<'3대' | '기본'>('3대');

  const planData = {
    '3대': [
      {
        title: 'GymMate 3대 200 도전권',
        desc: '기초 체력 + 올바른 자세부터 시작하고 싶은 고객님들을 위한',
        originPrice: '26,000원',
        discountPrice: '22,900원',
        points: '30,000포인트 적립 + 4000포인트 추가',
      },
      {
        title: 'GymMate 3대 300 도전권',
        desc: '운동 루틴 정립, 식단 코칭까지 배우고 싶은 고객님을 위한',
        originPrice: '36,000원',
        discountPrice: '32,900원',
        points: '40,000포인트 적립 + 7000포인트 추가',
      },
      {
        title: 'GymMate 3대 400 도전권',
        desc: '바디 프로필 도전 대회 준비 하시는 고객님들을 위한',
        originPrice: '48,000원',
        discountPrice: '39,900원',
        points: '50,000포인트 적립 + 1만포인트 추가',
      },
    ],
    기본: [
      {
        title: 'GymMate 기본 100 도전권',
        desc: '헬스 입문자를 위한 가벼운 도전 패키지',
        originPrice: '16,000원',
        discountPrice: '11,900원',
        points: '10,000포인트 적립 + 100포인트 추가',
      },
      {
        title: 'GymMate 기본 150 도전권',
        desc: '운동 습관 정착을 위한 중간 단계 요금제',
        originPrice: '22,000원',
        discountPrice: '17,900원',
        points: '15,000포인트 적립 + 150포인트 추가',
      },
    ],
  };

  return (
    <motion.section
      className="w-full bg-[#2C2C2C] py-[100px] text-white"
      initial={{ opacity: 0, y: 60 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="max-w-[1440px] px-8 mx-auto flex justify-between gap-20">
        <div className="flex flex-col justify-start pt-2">
          <h2 className="text-[28px] font-bold leading-relaxed mb-6 whitespace-pre-line">
            당신이 찾는{'\n'}최고의 요금제
          </h2>

          <div className="flex flex-col gap-3">
            <button
              className={`px-6 py-3 rounded-xl text-sm font-semibold ${
                activeTab === '3대'
                  ? 'bg-main text-white'
                  : 'bg-[#444] text-white'
              }`}
              onClick={() => setActiveTab('3대')}
            >
              3대 요금제
            </button>
            <button
              className={`px-6 py-3 rounded-xl text-sm font-semibold ${
                activeTab === '기본'
                  ? 'bg-main text-white'
                  : 'bg-[#444] text-white'
              }`}
              onClick={() => setActiveTab('기본')}
            >
              기본 요금제
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full max-w-[700px]">
          {planData[activeTab].map((item, idx) => (
            <motion.div
              key={idx}
              className="relative p-6 rounded-2xl border border-[#666] bg-[#2C2C2C] text-white"
              initial={{ opacity: 0, y: 30 }}
              transition={{
                duration: 0.5,
                delay: 0.3 + idx * 0.2,
              }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <span className="absolute top-4 right-4 border border-main text-main text-xs px-3 py-1 rounded-full">
                {item.points}
              </span>

              <p className="text-base font-bold mb-1">
                <span className="text-white font-bold">Gym</span>
                <span className="text-main font-bold">M</span>ate{' '}
                {item.title.replace('GymMate ', '')}
              </p>

              <p className="text-sm text-mono_300 mb-6">{item.desc}</p>

              <div className="flex justify-between ml-[410px]">
                <div className="flex flex-col text-left">
                  <span className="text-xs text-mono_400 mb-1 ml-[56px]">
                    오픈기념 할인가
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs line-through text-mono_400">
                      {item.originPrice}
                    </span>
                    <span className="text-lg font-bold text-main">
                      {item.discountPrice}
                    </span>
                  </div>
                </div>

                <button className="bg-main text-white text-sm w-[90px] h-[35px] rounded-lg mt-[10px] ml-[10px]">
                  구매하기
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default PointPlanSection;
