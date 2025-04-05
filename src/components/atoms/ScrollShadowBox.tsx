'use client';

import { ReactNode, memo } from 'react';
import { ScrollShadow, Card, CardBody } from '@nextui-org/react';

type Props = {
  children: ReactNode;
};

const ScrollContainerBox = ({ children }: Props) => (
  <Card className="w-[820px] h-[473px]">
    <CardBody className="p-4 overflow-y-auto scrollbar-thumb-main scrollbar-track-mono-100">
      <ScrollShadow orientation="vertical">{children}</ScrollShadow>
    </CardBody>
  </Card>
);

export default memo(ScrollContainerBox);
