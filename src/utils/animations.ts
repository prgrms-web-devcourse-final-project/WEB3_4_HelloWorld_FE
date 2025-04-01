import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

// interface ScrollTriggerOptions {
//   trigger: string | Element;
//   start: string;
//   end?: string;
//   scrub: number;
//   animation: gsap.core.Tween;
//   markers?: { startColor: string; endColor: string };
// }

class Animation {
  static layout = {
    // header: (target: AnimationTarget) => {
    //   const trigger = '#visual';
    //   const scrollTrigger = (target: Element, option: gsap.TweenVars) => {
    //     ScrollTrigger.create({
    //       trigger,
    //       start: 'top top',
    //       scrub: 1,
    //       animation: gsap.to(target, option),
    //       markers: { startColor: '#111', endColor: '#111' },
    //     });
    //   };
    //   if (target.current) {
    //     scrollTrigger(target.current, {
    //       padding: '0 10vw',
    //     });
    //   }
    // },
    // main: () => {
    //   const scrollTrigger = (
    //     target: string | Element,
    //     option: gsap.TweenVars,
    //   ) => {
    //     ScrollTrigger.create({
    //       trigger: '#main',
    //       start: 'top top',
    //       scrub: 1,
    //       animation: gsap.to(target, option),
    //       markers: { startColor: '#111', endColor: '#111' },
    //     });
    //   };
    // },
  };

  static visual = {
    main: (ref: HTMLDivElement) => {
      const scrollTrigger = (
        target: string | Element,
        option: gsap.TweenVars,
      ) => {
        ScrollTrigger.create({
          trigger: ref,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          animation: gsap.to(target, option),
        });
      };

      scrollTrigger('.visual', {
        height: '100%',
        padding: '0 5vw',
        borderRadius: '10%',
        duration: 1.2,
        ease: 'power2.out',
      });
      scrollTrigger('.visual .visual_back', {
        borderRadius: '20px',
        duration: 1.2,
        ease: 'power2.out',
      });
    },
  };

  static ptSection = {
    main: () => {
      const cards = document.querySelectorAll<HTMLElement>('.pt-card');
      const cardBgs = document.querySelectorAll<HTMLElement>('.pt-cardBg');
      const cleanupFunctions: (() => void)[] = [];

      cards.forEach((card, index) => {
        const cardBg = cardBgs[index];

        if (!cardBg) return;

        let mouseLeaveDelay: NodeJS.Timeout | null = null;
        const cardRect = card.getBoundingClientRect();
        const { width, height } = cardRect;

        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const mouseX = e.clientX - rect.left - width / 2;
          const mouseY = e.clientY - rect.top - height / 2;

          const rotateX = (mouseY / height) * -30;
          const rotateY = (mouseX / width) * 30;
          const translateX = (mouseX / width) * -40;
          const translateY = (mouseY / height) * -40;

          gsap.to(card, {
            rotateX,
            rotateY,
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.to(cardBg, {
            translateX,
            translateY,
            duration: 0.3,
            ease: 'power2.out',
          });
        };

        const handleMouseEnter = () => {
          if (mouseLeaveDelay) {
            clearTimeout(mouseLeaveDelay);
            mouseLeaveDelay = null;
          }
        };

        const handleMouseLeave = () => {
          mouseLeaveDelay = setTimeout(() => {
            gsap.to(card, {
              rotateX: 0,
              rotateY: 0,
              duration: 0.5,
              clearProps: 'transform',
            });
            gsap.to(cardBg, {
              translateX: 0,
              translateY: 0,
              duration: 0.5,
              clearProps: 'transform',
            });
            mouseLeaveDelay = null;
          }, 1000);
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        cleanupFunctions.push(() => {
          if (mouseLeaveDelay) {
            clearTimeout(mouseLeaveDelay);
          }
          card.removeEventListener('mousemove', handleMouseMove);
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mouseleave', handleMouseLeave);
          gsap.killTweensOf(card);
          gsap.killTweensOf(cardBg);
        });
      });

      return () => {
        cleanupFunctions.forEach((cleanup) => cleanup());
      };
    },
  };
}

export default Animation;
