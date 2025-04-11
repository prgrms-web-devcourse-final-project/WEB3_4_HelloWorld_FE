import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useTheme } from 'next-themes';

interface PieChartProps {
  labels: string[];
  series: number[];
}

const PieChart = ({ labels, series }: PieChartProps) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';

  const labelColor = isDarkMode ? '#F9F9F8' : '#0C0A09';

  const options: ApexOptions = {
    chart: {
      type: 'donut',
      fontFamily: 'var(--font-pretendard)',
    },
    plotOptions: {
      pie: {
        customScale: 1.05,
      },
    },
    labels,
    legend: {
      position: 'bottom',
      labels: {
        colors: labelColor,
      },
      fontSize: '14px',
      fontFamily: 'var(--font-pretendard)',
    },
    colors: ['#53a3fd', '#7bb9ff', '#bfddff'],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontFamily: 'var(--font-pretendard)',
        colors: [labelColor],
        fontWeight: 500,
      },
      formatter: (val: number) => `${Math.round(val)}%`,
      dropShadow: {
        enabled: false,
      },
    },
    states: {
      hover: {
        filter: {
          type: 'lighten',
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '14px',
        fontFamily: 'var(--font-pretendard)',
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
