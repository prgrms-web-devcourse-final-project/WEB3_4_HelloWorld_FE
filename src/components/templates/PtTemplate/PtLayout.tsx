import Section from '@/components/atoms/Section';
import PtHeroBanner from '@/components/molecules/PT/PtHeroBanner';

export default function PtLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PtHeroBanner />
      <Section>
        <div className="pt-10">{children}</div>
      </Section>
    </div>
  );
}
