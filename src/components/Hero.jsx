import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        '-=0.6'
      )
      .fromTo(
        buttonRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8 },
        '-=0.4'
      )
      .fromTo(
        glowRef.current,
        { opacity: 0 },
        { opacity: 0.5, duration: 1, repeat: -1, yoyo: true },
        '-=1'
      );
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-b from-background to-surface">
      {/* Background Glow Effect */}
      <div
        ref={glowRef}
        className="absolute w-[600px] h-[600px] bg-neonCyan blur-3xl rounded-full opacity-30 animate-pulse z-0"
        style={{ top: '10%', left: '50%', transform: 'translateX(-50%)' }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-3xl">
        <h1
          ref={titleRef}
          className="text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white tracking-wide drop-shadow-[0_0_10px_#00f0ff]"
        >
          Real-Time Crypto Intelligence
        </h1>

        <p
          ref={subtitleRef}
          className="mt-6 text-lg md:text-xl text-gray-300 font-sora tracking-wide"
        >
          Track portfolios. Predict prices. Dominate the digital markets — all in a single dashboard.
        </p>

        <button
          ref={buttonRef}
          className="mt-10 px-8 py-4 text-lg font-semibold rounded-xl font-orbitron text-black bg-neonCyan hover:bg-neonPink hover:text-white transition-all duration-300 shadow-[0_0_20px_#00f0ff] hover:shadow-[0_0_25px_#ff00f0] animate-glow"
        >
          Launch Dashboard
        </button>
      </div>
    </section>
  );
};

export default Hero;
