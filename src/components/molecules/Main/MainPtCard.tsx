import Link from 'next/link';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

import { Award } from '@/types/pt.types';
import { formatCash } from '@/utils/formatter';

type MainPtCardProps = {
  className?: string;
  title: string;
  content: string;
  backgroundImage: string;
  score: number;
  awards?: Award[];
  id: string;
  productName?: string;
  ptProductFee?: number;
};

export default function MainPtCard({
  className = '',
  title,
  content,
  score,
  ptProductFee,
  productName,
  awards,
  backgroundImage,
  id,
}: MainPtCardProps) {
  return (
    <div
      className={`pt-card  transform perspective-[800px] w-full h-full antialiased cursor-pointer group ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <Link className="cursor-pointer" href={`/pt/${id}`}>
        <div
          className="
          relative flex-none max-w-96 w-full h-[500px] bg-stone-800 overflow-hidden rounded-xl
          transition duration-1000 ease-out
          group-hover:shadow-[rgba(255,255,255,0.2)_0_0_10px_5px,rgba(255,255,255,1)_0_0_0_1px,rgba(0,0,0,0.66)_0_20px_30px_0,inset_#333_0_0_0_5px,inset_white_0_0_0_6px]
          group-hover:transition-[box-shadow] group-hover:duration-1000 group-hover:ease-out
        "
        >
          {/* <Link href={`/pt/${id}`}></Link> */}
          <div
            className="
            pt-cardBg opacity-50 box-content absolute -top-5 -left-5 w-full h-full p-5
            bg-no-repeat bg-center bg-cover
            transition duration-500 ease-out pointer-events-none
            group-hover:opacity-80 group-hover:transition-[opacity] group-hover:duration-300 group-hover:ease-out
          "
            style={{
              backgroundImage: `url(${backgroundImage || '/gym/icons/default.png'})`,
            }}
          />
          <div
            className="
            perspective-[800px]
            p-5 w-full absolute bottom-0 text-white transform translate-y-[20%]
            transition duration-600  ease-[cubic-bezier(0.215,0.61,0.355,1)]
            group-hover:transform group-hover:translate-y-0
            after:content-[''] after:absolute after:top-0 after:left-0 after:z-0
            after:w-full after:h-full after:rounded-lg
            after:backdrop-blur-md after:from-transparent after:bg-[rgba(0,0,0,0.4)]
            after:opacity-0 after:transform after:translate-y-full
            after:transition after:duration-300 after:ease-out
            group-hover:after:opacity-100 group-hover:after:transform group-hover:after:translate-y-0
          "
          >
            <div className="flex w-full  py-1 items-center  justify-between">
              <h1 className="text-lg font-semibold transform transform-preserve-3d perspective-[800px] translate-z-[45px] text-shadow-[0_10px_10px_rgba(0,0,0,0.5)] relative z-[1]">
                {productName ? productName : title}
              </h1>
              <div className="z-10  flex items-center mb-1 gap-1">
                <StarIconSolid className="w-5 h-5" />
                {/* <Star h="h-5" rate={score} readonly={true} w="w-5" /> */}
                <span className="text-sm text-gray200">{score.toFixed(1)}</span>
              </div>
            </div>
            <div
              className="
              opacity-0 h-0 text-shadow-[0_2px_3px_rgba(0,0,0,1)]
              transition duration-700 delay-500 ease-[cubic-bezier(0.215,0.61,0.355,1)]
              relative z-[1]
              group-hover:opacity-100 group-hover:h-full
            "
            >
              <div className=" w-full py-3 flex flex-col items-start">
                <div className="w-full py-2">
                  <p className="pb-2 font-semibold text-base text-stone-300">
                    {awards ? '수상이력' : title || ''}
                  </p>
                  <div className=" w-full flex flex-col items-start">
                    {awards ? (
                      awards.slice(0, 3).map((item, index) => {
                        return <p key={index}>{item.awardName}</p>;
                      })
                    ) : productName ? (
                      <div className="flex w-full justify-between">
                        <p>가격</p>
                        <p className="text-lg">
                          {formatCash(Number(ptProductFee)) + '원' || ''}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="w-full py-2 ">
                  <p className="pb-2 font-semibold text-stone-300 ">소개</p>
                  <div className="px-2 py-2 w-full text-wrap  rounded-lg bg-stone-900/30">
                    {content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
