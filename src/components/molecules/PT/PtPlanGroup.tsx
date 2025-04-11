import { UseRadioProps } from '@heroui/radio/dist/use-radio';
import { useRadio, VisuallyHidden, cn } from '@heroui/react';
import { Image } from '@heroui/react';

type PtPlanGroupProps = UseRadioProps & {
  imageSrc?: string;
};

export const PtPlanGroup = ({ imageSrc, ...props }: PtPlanGroupProps) => {
  const {
    Component,
    children,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        'group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent',
        'w-full cursor-pointer border-2 border-default rounded-lg gap-4 p-4',
        'data-[selected=true]:border-primary',
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>

      <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
      <div className="flex gap-3 items-center flex-row-reverse">
        <div {...getLabelWrapperProps()}>
          {children && (
            <div className="text-lg" {...getLabelProps()}>
              {children}
            </div>
          )}
          {description && (
            <span className="text-large mt-5 text-foreground opacity-70">
              {description}
            </span>
          )}
        </div>

        {imageSrc && <Image height={100} src={imageSrc} width={100} />}
      </div>
    </Component>
  );
};
