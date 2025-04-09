import { Button, Card, CardBody, CardHeader, Image } from '@heroui/react';

export default function PtProductItem({
  title,
  amount,
  info,
  image,
}: {
  title: string;
  amount: string;
  info: string;
  image: string;
}) {
  return (
    <div className="w-full ">
      <Card className="py-4 ">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
          <h4 className="font-bold text-large">{title}</h4>
          <small className="text-default-500">{amount}</small>
          <p className="text-tiny uppercase font-bold">{info}</p>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={image}
            width={270}
          />
          <div className="flex justify-center gap-2">
            <Button>수정</Button>
            <Button>삭제</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
