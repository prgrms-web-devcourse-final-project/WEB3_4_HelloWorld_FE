import { ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

import Section from '@/components/atoms/Section';
import { MyButton } from '@/components/atoms/Button';

type MainSectionProps = {
  title: string;
  subTitle: string;
  description: string;
  children: React.ReactNode;
  isRouteButton?: boolean;
  buttonText?: string;
  isFixedColor?: boolean;
  link: string;
};

export default function MainSectionTitle({
  title,
  subTitle,
  description,
  children,
  isRouteButton = false,
  buttonText = '더보기',
  link = '',
  isFixedColor = false,
}: MainSectionProps) {
  const router = useRouter();

  return (
    <Section>
      <div className="flex justify-between pb-[3vw] items-end lg:flex-row flex-col">
        <div className="flex flex-col gap-y-3 w-full mb-8 lg:mb-0">
          <p
            className={clsx(
              'text-md font-semibold ',
              isFixedColor && 'text-stone-200',
              !isFixedColor && 'text-mono_600',
            )}
          >
            {subTitle}
          </p>
          <div>
            <h2
              className={clsx(
                'text-4xl font-point hyphens-manual pb-2 font-semibold',
                isFixedColor && 'text-stone-100',
                !isFixedColor && 'text-mono_800',
              )}
            >
              {title}
            </h2>
            <span
              className={clsx(
                'text-md font-medium',
                isFixedColor && 'text-stone-200',
                !isFixedColor && 'text-mono_300',
              )}
            >
              {description}
            </span>
          </div>
        </div>
        {isRouteButton && (
          <div>
            <MyButton
              color="transparent"
              endContent={<ArrowRightIcon className="w-4 h-4" />}
              size="sm"
              variant="light"
              onPress={() => router.push(link)}
            >
              {buttonText}
            </MyButton>
          </div>
        )}
      </div>
      <section className="">{children}</section>
    </Section>
  );
}
