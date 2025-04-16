import { Card } from '@heroui/react';
type NumberCountCardProps = {
  countNumber: number;
  title: string;
  fullWidth?: boolean;
  fillColor?: boolean;
};
export default function NumberCountCard({
  countNumber,
  title,
  fullWidth = false,
  fillColor = false,
}: NumberCountCardProps) {
  return (
    <Card
      isBlurred
      className={`p-4 flex flex-col gap-2 items-center justify-center ${
        fillColor ? 'bg-main' : 'bg-stone-100/50'
      }`}
      fullWidth={fullWidth}
      radius="sm"
      shadow="none"
    >
      <div className=" flex gap-1">
        <p
          className="text-4xl flex gap-1 font-semibold text-stone-100"
          id="number"
        >
          {countNumber}
        </p>
        <span className=" text-4xl text-stone-100">명</span>
      </div>
      <span className="text-sm text-stone-100">{title}</span>
    </Card>
  );
}
