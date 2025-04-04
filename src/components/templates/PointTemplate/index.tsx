import PointHeader from '@/components/templates/PointTemplate/PointHeader';
import PointPlanSection from '@/components/templates/PointTemplate/PointPlanSection';

export default function PointTemplate() {
  return (
    <>
      <section className="w-full max-w-[1440px] px-8 mx-auto pt-[100px] mb-[100px]">
        <PointHeader />
      </section>

      <PointPlanSection />
    </>
  );
}
