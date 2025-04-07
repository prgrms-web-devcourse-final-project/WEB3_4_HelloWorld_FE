import TrainerLayoutTemplate from '@/components/templates/TrainerLayoutTemplate';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Trainer Dashboard',
};

export const runtime = 'edge';

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TrainerLayoutTemplate>{children}</TrainerLayoutTemplate>;
}
