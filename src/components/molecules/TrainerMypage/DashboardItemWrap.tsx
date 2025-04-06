import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Button, Card, CardBody, CardHeader } from '@heroui/react';

export default function DashboardItemWrap({
  children,
  title,
  date,
}: {
  children: React.ReactNode;
  title: string;
  date?: string;
}) {
  return (
    <>
      <Card className="px-2">
        <CardHeader className="flex justify-between">
          <h4>{title}</h4>
          <div className="flex gap-2 items-center">
            <p className="text-sm text-mono_300">{date}</p>
            <Button isIconOnly color={undefined} variant="light">
              <ArrowRightIcon height={20} width={20} />
            </Button>
          </div>
        </CardHeader>
        <CardBody>{children}</CardBody>
      </Card>
    </>
  );
}
