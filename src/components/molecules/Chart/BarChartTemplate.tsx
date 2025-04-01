'use client';

import ReactApexChart from 'react-apexcharts';

interface BarChartProps {
  categories: string[];
  userSeries: number[];
  avgSeries: number[];
}

const BarChart = ({ categories, userSeries, avgSeries }: BarChartProps) => {
  const options = {
    chart: {
      type: 'bar',
      stacked: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '40%',
      },
    },
    xaxis: {
      categories,
    },
    colors: ['#3B82F6', '#F68B8F'], // 사용자: 파란색 / 평균: 핑크색
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: 'top' as const,
    },
  };

  const series = [
    {
      name: '사용자',
      data: userSeries,
    },
    {
      name: 'GymMate 회원 평균',
      data: avgSeries,
    },
  ];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      width="100%"
      height="100%"
    />
  );
};

export default BarChart;
