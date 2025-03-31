import { Card, CardBody, cn } from '@heroui/react';

type MainGymCardItemProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
};
export default function MainGymCardItem({
  title,
  description,
  icon,
  className,
}: MainGymCardItemProps) {
  return (
    <Card className={cn('bg-mono_050', className)} shadow="none">
      <CardBody>
        <div className="flex justify-between items-center px-3 py-2 gap-2">
          <div className="flex flex-col gap-4">
            <span className="text-base text-mono_500">{description}</span>
            <p className="text-2xl font-semibold text-mono_600">{title}</p>
          </div>
          <div>{icon}</div>
        </div>
      </CardBody>
    </Card>
  );
}
