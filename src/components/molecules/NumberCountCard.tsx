import { Card } from '@heroui/react';
type NumberCountCardProps = {
  countNumber: number;
  title: string;
};
export default function NumberCountCard({
  countNumber,
  title,
}: NumberCountCardProps) {
  return (
    <Card
      isBlurred
      className="p-4 flex flex-col gap-2 bg-stone-100/50 items-center justify-center"
      radius="sm"
      shadow="none"
    >
      <p className="text-4xl font-semibold text-stone-100">
        {countNumber}
        <span className="text-sm text-stone-100">명</span>
      </p>
      <span className="text-sm text-stone-100">{title}</span>
    </Card>
  );
}
