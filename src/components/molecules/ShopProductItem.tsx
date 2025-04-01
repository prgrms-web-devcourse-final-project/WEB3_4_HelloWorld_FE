import { Card, CardBody, CardFooter, Image } from '@heroui/react';

import Star from '@/components/molecules/StarGroup';
export default function ShopProductItem({ item }: any) {
  return (
    <Card isPressable shadow="sm">
      <CardBody className="overflow-visible p-0">
        <Image
          isZoomed
          alt={item.title}
          className="w-full object-cover h-full max-h-80"
          radius="lg"
          shadow="sm"
          src={item.img}
          width="100%"
        />
      </CardBody>
      <CardFooter className="text-small items-start justify-between">
        <div className="flex flex-col items-start gap-2">
          <b>{item.title}</b>
          <p className="text-default-500">{item.price}</p>
        </div>
        <div className="flex items-center gap-1">
          <Star h={'h-4'} rate={4.7} readonly={true} w={'w-4'} />
          <span>4.7</span>
        </div>
      </CardFooter>
    </Card>
  );
}
