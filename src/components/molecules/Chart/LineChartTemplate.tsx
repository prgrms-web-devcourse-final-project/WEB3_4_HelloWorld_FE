import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface LineChartProps {
  categories: string[];
  data: number[];
  height?: string;
  width?: string;
}

const LineChart = ({ categories, data }: LineChartProps) => {
  const options: ApexOptions = {
    chart: {
      type: 'line',
    },
    xaxis: {
      categories,
    },
    stroke: {
      curve: 'smooth',
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
