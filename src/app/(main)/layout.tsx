import MainLayoutTemplate from '@/components/templates/MainLayoutTemplate';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MainLayoutTemplate>{children}</MainLayoutTemplate>
    </div>
  );
}
