import { Card, CardBody, CardFooter, Chip, Image } from '@heroui/react';
import Link from 'next/link';

import { formatCash } from '@/utils/formatter';
export default function ShopProductItem({ item }: any) {
  return (
    <Card isPressable className="w-full" shadow="sm">
      <Link className="w-full" href={item.link}>
        <CardBody className=" w-full relative p-0">
          <Image
            isZoomed
            alt={item.title}
            className=" object-cover"
            loading="lazy"
            radius="lg"
            shadow="sm"
            // sizes="100%"
            src={item.image}
          />
          <Chip
            className="absolute inset-0 z-50 left-2 top-2"
            color="primary"
            size="sm"
          >
            {item.category1}
          </Chip>
        </CardBody>
      </Link>
      <CardFooter className="text-small items-start justify-between">
        <div className="flex flex-col items-start justify-start gap-2">
          <b
            dangerouslySetInnerHTML={{ __html: item.title }}
            className="line-clamp-1 hyphens-manual text-start"
          />
          <div className="flex justify-between">
            <p className="text-default-500">
              {formatCash(Number(item.lprice)) + '원'}
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
