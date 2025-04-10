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
        <CardHeader className="pb-0 pt-2 px-4 ">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={image}
            width={270}
          />
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <div className="flex flex-col gap-2">
            <div>
              <h4 className="font-bold text-large">{title}</h4>
            </div>
            <span className="text-default-500 text-md">{amount}</span>
            <p className="text-md">{info}</p>
          </div>
          <div className="flex py-5 justify-center gap-2">
            <Button fullWidth color="primary">
              수정
            </Button>
            <Button fullWidth>삭제</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
