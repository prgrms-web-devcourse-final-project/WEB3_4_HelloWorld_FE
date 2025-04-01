'use client';

import { Fragment, cloneElement, isValidElement } from 'react';
import LevelBadge from '@/components/atoms/LevelBadge';

interface SummaryCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
}

const SummaryCard = ({ title, value, icon }: SummaryCardProps) => {
  const isMain = title.includes('Mate');

  const resizedIcon =
    icon && isValidElement(icon)
      ? cloneElement(icon as React.ReactElement, {
          width: 85,
          height: 85,
        })
      : icon;

  return (
    <div
      style={{
        width: 333,
        height: 100,
        paddingLeft: 40,
        paddingRight: 50,
      }}
      className={`relative rounded-2xl shadow-md flex ${isMain ? 'flex-col justify-center px-6 pt-3 pb-4' : 'items-center gap-[72px] px-6'}`}
    >
      {isMain ? (
        <>
          <div className="flex items-center justify-between w-full mb-1">
            <p className="text-base font-semibold">
              Gym<span className="text-main">M</span>ate
            </p>
            <LevelBadge level={4} />
          </div>
          <p className="text-xl font-bold text-mono_900 text-center w-full">
            {value}
          </p>
        </>
      ) : (
        <>
          <div className="w-[85px] h-[85px] flex items-center justify-center">
            {resizedIcon}
          </div>
          <div className="flex flex-col justify-center w-full">
            <p className="text-[13px] text-mono_300">{title}</p>
            <p className="text-xl font-bold text-mono_900 mt-1">{value}</p>
          </div>
        </>
      )}
    </div>
  );
};

interface CalendarSummaryCardsProps {
  data: {
    title: string;
    value: string;
    icon?: React.ReactNode;
  }[];
}

const CalendarSummaryCards = ({ data }: CalendarSummaryCardsProps) => (
  <div className="mt-[100px] flex gap-[24px]">
    {data.map(({ title, value, icon }, idx) => (
      <Fragment key={idx}>
        <SummaryCard title={title} value={value} icon={icon} />
      </Fragment>
    ))}
  </div>
);

export default CalendarSummaryCards;
