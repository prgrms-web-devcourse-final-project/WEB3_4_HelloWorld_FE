'use client';

import { useEffect, useRef } from 'react';

import Animation from '@/utils/animations';

export default function MainVisualSection() {
  const AnimationRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (AnimationRef.current) {
      Animation.visual.main(AnimationRef.current);
    }
  }, []);

  return (
    <div ref={AnimationRef} className="visual w-full h-full top-0">
      <div className="visual_back overflow-hidden w-full h-[calc(100vh-30vw)] md:h-screen relative">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
          preload="none"
        >
          <source src="/visual.mp4" type="video/mp4" />
        </video>
        <div className=" w-full  origin-center h-full absolute inset-0 left-0 flex bg-black/40 justify-center items-center z-20 ">
          <div className="text-center text-4xl/relaxed lg:text-8xl/relaxed font-bold rounded-full pb-0 lg:pb-16 z-20 text-gray-100">
            REACH YOUR LIMITS
            <br /> AND GET TO THE NEXT <span className="text-main">LEVEL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
