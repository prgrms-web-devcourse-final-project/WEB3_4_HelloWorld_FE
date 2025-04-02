'use client';

import ReactApexChart from 'react-apexcharts';

interface LineChartProps {
  categories: string[];
  data: number[];
}

const LineChart = ({ categories, data }: LineChartProps) => {
  const options = {
    chart: {
      type: 'line',
    },
    xaxis: {
      categories,
    },
    stroke: {
      curve: 'smooth' as const,
    },
    colors: ['#F25267'],
    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    {
      name: '3대 총합',
      data,
    },
  ];

  return (
    <ReactApexChart
      height="100%"
      options={options}
      series={series}
      type="line"
      width="100%"
    />
  );
};

export default LineChart;
