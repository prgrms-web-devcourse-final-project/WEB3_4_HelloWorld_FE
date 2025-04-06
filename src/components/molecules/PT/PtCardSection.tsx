import { Card } from '@heroui/react';

export default function PtCardSection({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="flex flex-col gap-5 px-2">
      <h3 className="text-mono_900 text-lg font-semibold">{title}</h3>
      <Card className="py-5 px-8">{children}</Card>
    </div>
  );
}
