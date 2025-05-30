import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const navRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
  }, []);

  const handleScrollTo = (id) => {
    setIsOpen(false);
    if (location.pathname !== '/home') {
      navigate('/home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#0a0a0acc] border-b border-[#1e1e1e] shadow-md"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-2xl font-orbitron text-neonCyan tracking-wider drop-shadow-[0_0_10px_#00f0ff] animate-glow">
            CypherDash
          </h1>
        </Link>

        {/* Desktop Nav */}
        <div className="space-x-6 hidden md:flex">
          <button onClick={() => handleScrollTo('crypto')} className="text-gray-300 font-sora hover:text-neonCyan transition duration-300">
            Crypto
          </button>
          <button onClick={() => handleScrollTo('whales')} className="text-gray-300 font-sora hover:text-neonPink transition duration-300">
            Whales
          </button>
          <button onClick={() => handleScrollTo('portfolio')} className="text-gray-300 font-sora hover:text-neonCyan transition duration-300">
            Portfolio
          </button>
          <button onClick={() => handleScrollTo('darkpool')} className="text-gray-300 font-sora hover:text-neonPink transition duration-300">
            Dark Pool
          </button>
          <button onClick={() => handleScrollTo('arbitrage')} className="text-gray-300 font-sora hover:text-neonCyan transition duration-300">
            Arbitrage
          </button>
          <button onClick={() => handleScrollTo('contact')} className="text-gray-300 font-sora hover:text-neonPink transition duration-300">
            Contact
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-4">
          <Link to="/pro-upgrade">
            <button className="px-3 py-2 bg-neonPink text-white font-orbitron rounded-md shadow-[0_0_12px_#ff00f0] hover:bg-neonCyan hover:text-black hover:shadow-[0_0_16px_#00f0ff] transition-all duration-300 text-sm">
              Sign In
            </button>
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="text-neonCyan">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0a0a0eff] px-6 py-4 border-t border-[#1e1e1e] shadow-inner space-y-4"
          >
            <button onClick={() => handleScrollTo('crypto')} className="block w-full text-left text-gray-300 font-sora hover:text-neonCyan transition duration-300">
              Crypto
            </button>
            <button onClick={() => handleScrollTo('whales')} className="block w-full text-left text-gray-300 font-sora hover:text-neonPink transition duration-300">
              Whales
            </button>
            <button onClick={() => handleScrollTo('portfolio')} className="block w-full text-left text-gray-300 font-sora hover:text-neonCyan transition duration-300">
              Portfolio
            </button>
            <button onClick={() => handleScrollTo('darkpool')} className="block w-full text-left text-gray-300 font-sora hover:text-neonPink transition duration-300">
              Dark Pool
            </button>
            <button onClick={() => handleScrollTo('arbitrage')} className="block w-full text-left text-gray-300 font-sora hover:text-neonCyan transition duration-300">
              Arbitrage
            </button>
            <button onClick={() => handleScrollTo('contact')} className="block w-full text-left text-gray-300 font-sora hover:text-neonPink transition duration-300">
              Contact
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
