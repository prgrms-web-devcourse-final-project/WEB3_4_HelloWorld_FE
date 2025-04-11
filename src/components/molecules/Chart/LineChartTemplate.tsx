import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useTheme } from 'next-themes';

interface LineChartProps {
  categories: string[];
  data: number[];
  height?: string;
  width?: string;
}

const LineChart = ({ categories, data }: LineChartProps) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';

  const labelColor = isDarkMode ? '#F9F9F8' : '#0C0A09';

  const options: ApexOptions = {
    chart: {
      type: 'line',
      fontFamily: 'var(--font-pretendard)',
    },
    xaxis: {
      categories,
      labels: {
        style: {
          colors: labelColor,
          fontSize: '14px',
          fontFamily: 'var(--font-pretendard)',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: '14px',
          fontFamily: 'var(--font-pretendard)',
        },
      },
    },
    stroke: {
      curve: 'smooth',
    },
    colors: ['#F25267'],
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      style: {
        fontSize: '14px',
        fontFamily: 'var(--font-pretendard)',
      },
    },
    legend: {
      labels: {
        colors: labelColor,
      },
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
