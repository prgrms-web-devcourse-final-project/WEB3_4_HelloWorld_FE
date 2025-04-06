'use client';

import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface PieChartProps {
  labels: string[];
  series: number[];
}

const PieChart = ({ labels, series }: PieChartProps) => {
  const options: ApexOptions = {
    chart: {
      type: 'donut',
    },
    plotOptions: {
      pie: {
        customScale: 1.05,
      },
    },
    labels,
    legend: {
      position: 'bottom',
    },
    colors: ['#F25267', '#F68B8F', '#F9C4C6'],
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${Math.round(val)}%`,
    },
    states: {
      hover: {
        filter: {
          type: 'none',
        },
      },
    },
  };

  return (
    <ReactApexChart
      height="100%"
      options={options}
      series={series}
      type="donut"
      width="100%"
    />
  );
};

export default PieChart;
