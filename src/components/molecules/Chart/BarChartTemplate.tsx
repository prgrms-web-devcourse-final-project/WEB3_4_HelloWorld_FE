import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

interface SeriesData {
  name: string;
  data: number[];
  color?: string;
}

interface BarChartStyleOptions {
  colors?: string[];
  columnWidth?: string;
  horizontal?: boolean;
  height?: string | number;
  width?: string | number;
  legendPosition?: 'top' | 'right' | 'bottom' | 'left';
  dataLabels?: boolean;
  fontFamily?: string;
  fontSize?: string;
  toolbar?: boolean;
  labelColor?: string;
  animation?: {
    enabled?: boolean;
    speed?: number;
    animateGradually?: {
      enabled?: boolean;
      delay?: number;
    };
  };
  seriesStyle?: {
    borderRadius?: number;
    distributed?: boolean;
    rangeBarOverlap?: boolean;
    rangeBarGroupRows?: boolean;
  };
}

interface BarChartProps {
  categories: string[];
  series?: SeriesData[];
  styleOptions?: BarChartStyleOptions;
  title?: string;
  subtitle?: string;
}

const defaultStyleOptions: BarChartStyleOptions = {
  colors: ['#3B82F6', '#F68B8F'],
  columnWidth: '40%',
  horizontal: false,
  height: '100%',
  width: '100%',
  legendPosition: 'top',
  dataLabels: false,
  fontFamily: 'var(--font-pretendard)',
  fontSize: '14px',
  toolbar: false,
  labelColor: 'var(--heroui-mono_600)',
  animation: {
    enabled: true,
    speed: 1000,
    animateGradually: {
      enabled: true,
      delay: 150,
    },
  },
  seriesStyle: {
    borderRadius: 4,
    distributed: false,
    rangeBarOverlap: false,
    rangeBarGroupRows: false,
  },
};

const defaultSeries: SeriesData[] = [
  {
    name: '사용자',
    data: [],
  },
  {
    name: 'GymMate 회원 평균',
    data: [],
  },
];

const BarChart = ({
  categories,
  series = defaultSeries,
  styleOptions = {},
  title,
  subtitle,
}: BarChartProps) => {
  const mergedOptions = { ...defaultStyleOptions, ...styleOptions };

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      stacked: false,
      toolbar: {
        show: mergedOptions.toolbar,
      },
      fontFamily: mergedOptions.fontFamily,
      animations: mergedOptions.animation,
    },
    plotOptions: {
      bar: {
        horizontal: mergedOptions.horizontal,
        columnWidth: mergedOptions.columnWidth,
        borderRadius: mergedOptions.seriesStyle?.borderRadius,
        distributed: mergedOptions.seriesStyle?.distributed,
        rangeBarOverlap: mergedOptions.seriesStyle?.rangeBarOverlap,
        rangeBarGroupRows: mergedOptions.seriesStyle?.rangeBarGroupRows,
      },
    },
    title: {
      text: title,
      align: 'left',
      style: {
        fontSize: '18px',
        fontWeight: '600',
        fontFamily: mergedOptions.fontFamily,
      },
    },
    subtitle: {
      text: subtitle,
      align: 'left',
      style: {
        fontSize: mergedOptions.fontSize,
        fontFamily: mergedOptions.fontFamily,
      },
    },
    xaxis: {
      categories,
      labels: {
        style: {
          fontSize: mergedOptions.fontSize,
          fontFamily: mergedOptions.fontFamily,
          colors: mergedOptions.labelColor,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: mergedOptions.fontSize,
          fontFamily: mergedOptions.fontFamily,
          colors: mergedOptions.labelColor,
        },
      },
    },
    colors: styleOptions.colors || mergedOptions.colors,
    dataLabels: {
      enabled: mergedOptions.dataLabels,
      style: {
        fontSize: mergedOptions.fontSize,
        fontFamily: mergedOptions.fontFamily,
      },
    },
    legend: {
      position: mergedOptions.legendPosition,
      fontSize: mergedOptions.fontSize,
      fontFamily: mergedOptions.fontFamily,
    },
    tooltip: {
      style: {
        fontSize: mergedOptions.fontSize,
        fontFamily: mergedOptions.fontFamily,
      },
    },
  };

  return (
    <ReactApexChart
      height={mergedOptions.height}
      options={options}
      series={series}
      type="bar"
      width={mergedOptions.width}
    />
  );
};

export default BarChart;
