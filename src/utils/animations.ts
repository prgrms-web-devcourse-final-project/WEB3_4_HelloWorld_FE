import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

class Animation {
  static layout = {
    header: (target) => {
      let trigger = '#visual';
      const scrollTrigger = (target, option) => {
        ScrollTrigger.create({
          trigger: trigger,
          start: 'top top',
          scrub: 1,
          animation: gsap.to(target, option),
          markers: { startColor: '#111', endColor: '#111' },
        });
      };

      scrollTrigger(target.current, {
        // scaleX:"90%",
        // scale: 0.7,
        padding: '0 10vw',
        // rotation: 1500,
        // filter: "blur(50px)",
        // opacity: 0
      });
    },
    main: () => {
      const scrollTrigger = (target, option) => {
        ScrollTrigger.create({
          trigger: '#main',
          start: 'top top',
          scrub: 1,
          animation: gsap.to(target, option),
          markers: { startColor: '#111', endColor: '#111' },
        });
      };

      //   scrollTrigger('#progress', {
      //     width: '100%',
      //   });
      //   const lenis = new Lenis({
      //     duration: 2,
      //     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      //     direction: 'vertical', // vertical, horizontal
      //     gestureDirection: 'vertical', // vertical, horizontal, both
      //     smooth: true,
      //   });

      //   function raf(time) {
      //     lenis.raf(time);
      //     requestAnimationFrame(raf);
      //   }

      //   requestAnimationFrame(raf);
    },
  };
  static visual = {
    main: (ref) => {
      const scrollTrigger = (target, option) => {
        ScrollTrigger.create({
          trigger: ref.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          animation: gsap.to(target, option),
        });
      };

      scrollTrigger('.visual', {
        height: '100%',
        padding: '0 5vw',
        // width: 'calc(100% - 10vw)',
        borderRadius: '10%',
        duration: 1.2,
        ease: 'power2.out',
      });
      scrollTrigger('.visual .visual_back', {
        // padding: '0 10vw',
        borderRadius: '20px',
        duration: 1.2,
        ease: 'power2.out',
      });
    },
  };
  static ptSection = {
    main: () => {
      let mouseLeaveDelay: string | number | NodeJS.Timeout | null | undefined =
        null;
      const card: any = document.querySelector('.pt-card');
      const cardBg: any = document.querySelector('.pt-cardBg');

      const handleMouseMove = (e: any) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const mouseX = e.clientX - left - width / 2;
        const mouseY = e.clientY - top - height / 2;

        const rotateX = (mouseY / height) * -30;
        const rotateY = (mouseX / width) * 30;
        const translateX = (mouseX / width) * -40;
        const translateY = (mouseY / height) * -40;

        gsap.to(card, { rotateX, rotateY, duration: 0.3, ease: 'power2.out' });
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
        }
      };

      const handleMouseLeave = () => {
        mouseLeaveDelay = setTimeout(() => {
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5 });
          gsap.to(cardBg, {
            translateX: 0,
            translateY: 0,
            duration: 0.5,
          });
        }, 1000);
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    },
  };
}

export default Animation;
