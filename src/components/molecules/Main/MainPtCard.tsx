'use client';

import Star from '@/components/molecules/StarGroup';

type MainPtCardProps = {
  className?: string;
  title: string;
  content: string;
  backgroundImage: string;
};

export default function MainPtCard({
  className = '',
  title,
  content,
  backgroundImage,
}: MainPtCardProps) {
  return (
    <div
      className={`pt-card m-2 transform perspective-[800px] max-w-fit cursor-pointer group ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        className="
          relative flex-none w-[325px] h-[500px] bg-stone-800 overflow-hidden rounded-xl
          transition duration-1000 ease-out
          group-hover:shadow-[rgba(255,255,255,0.2)_0_0_40px_5px,rgba(255,255,255,1)_0_0_0_1px,rgba(0,0,0,0.66)_0_30px_60px_0,inset_#333_0_0_0_5px,inset_white_0_0_0_6px]
          group-hover:transition-[box-shadow] group-hover:duration-1000 group-hover:ease-out
        "
      >
        <div
          className="
            pt-cardBg opacity-50 box-content absolute -top-5 -left-5 w-full h-full p-5
            bg-no-repeat bg-center bg-cover
            transition duration-500 ease-out pointer-events-none
            group-hover:opacity-80 group-hover:transition-[opacity] group-hover:duration-300 group-hover:ease-out
          "
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div
          className="
            p-5 w-full absolute bottom-0 text-white transform translate-y-[20%]
            transition duration-600 delay-500 ease-[cubic-bezier(0.215,0.61,0.355,1)]
            group-hover:transform group-hover:translate-y-0
            after:content-[''] after:absolute after:top-0 after:left-0 after:z-0
            after:w-full after:h-full after:rounded-lg
            after:backdrop-blur-md after:from-transparent after:to-[rgba(0,0,0,0.8)]
            after:opacity-0 after:transform after:translate-y-full
            after:transition after:duration-500 after:ease-out
            group-hover:after:opacity-100 group-hover:after:transform group-hover:after:translate-y-0
          "
        >
          <div className="flex  py-1 items-center justify-between">
            <h1 className="text-medium font-semibold text-shadow-[0_10px_10px_rgba(0,0,0,0.5)] relative z-[1]">
              {title}
            </h1>
            <div className="z-10 flex items-center mb-1 gap-1">
              <Star h="h-4" rate={4.5} readonly={true} w="w-4" />
              <span className="text-sm text-gray200">4.5</span>
            </div>
          </div>
          <div
            className="
              opacity-0 h-0 text-shadow-[0_2px_3px_rgba(0,0,0,1)]
              transition duration-300 delay-300 ease-[cubic-bezier(0.215,0.61,0.355,1)]
              relative z-[1]
              group-hover:opacity-100 group-hover:h-full
            "
          >
            <div className=" w-full flex flex-col items-start">
              <div className="w-full ">
                <p className="pb-2 ">수상이력</p>
                <div className=" w-full flex flex-col items-start">
                  <p>어떤 트레이너 대회 우승</p>
                  <p>어떤 트레이너 대회 우승</p>
                  <p>어떤 트레이너 대회 우승</p>
                </div>
              </div>
              <div className="w-full ">
                <p className="pb-2 ">소개</p>
                <div className="px-2 py-2 w-full  rounded-lg bg-stone-900/30">
                  {content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
