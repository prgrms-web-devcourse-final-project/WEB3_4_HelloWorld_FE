import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
  borderColor?: string;
  fillColor?: string;
  bgColor?: string;
};
