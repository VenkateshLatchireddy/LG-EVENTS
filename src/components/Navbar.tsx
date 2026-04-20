import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LGE_LOGO from '../assets/LGE.jpg';
import { 
  Menu, 
  X, 
  Sparkles,
  Home,
  Calendar,
  Briefcase,
  Image,
  Info,
  Newspaper,
  Mail
} from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Services', path: '/services', icon: Briefcase },
    { name: 'Gallery', path: '/gallery', icon: Image },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Blog', path: '/blog', icon: Newspaper },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  // Fixed animation variants without TypeScript errors
  const logoSpinVariants = {
    initial: { rotate: 0 },
    hover: { 
      scale: 1.1,
      rotate: 180,
      transition: { duration: 0.4, type: "spring" as const, stiffness: 300 }
    }
  };

  const navItemVariants = {
    hover: { 
      scale: 1.05, 
      y: -2,
      transition: { duration: 0.2, type: "spring" as const, stiffness: 400 }
    },
    tap: { scale: 0.95 }
  };

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      x: '-100%'
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring" as const, 
        stiffness: 300, 
        damping: 30,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      x: '-100%',
      transition: { type: "tween" as const, duration: 0.3 }
    }
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop" as const
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" as const, stiffness: 100 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full overflow-visible ${
          scrolled 
            ? 'bg-black py-2' 
            : 'bg-black py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo with Rotating Animation */}
            <motion.div
              whileHover="hover"
              initial="initial"
              variants={logoSpinVariants}
              className="flex-shrink-0 ml-0"
            >
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <motion.div
                    animate={pulseAnimation}
                    className="absolute inset-0 bg-gradient-to-r from-amber-500 to-red-500 rounded-full blur-xl opacity-50"
                  />
                  <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-xl overflow-hidden">
                    <img 
                      src={LGE_LOGO} 
                      alt="LAKSHMI GANAPATHI EVENTS" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="leading-tight">
                  <div className="text-sm md:text-base font-['Cormorant_Garamond'] font-bold bg-gradient-to-r from-amber-500 to-yellow-400 bg-clip-text text-transparent whitespace-nowrap tracking-wide">
                    LAKSHMI GANAPATHI
                  </div>
                  <div className="text-[9px] md:text-[11px] text-gray-400 -mt-0.5 tracking-[0.2em] font-['Cormorant_Garamond'] font-semibold">
                    EVENTS
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2 ml-4">
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  variants={navItemVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="relative"
                >
                  <Link
                    to={link.path}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      location.pathname === link.path
                        ? 'text-amber-500 bg-white/10 shadow-lg'
                        : 'text-white hover:text-amber-500 hover:bg-white/5'
                    }`}
                  >
                    <link.icon size={16} />
                    {link.name}
                    {location.pathname === link.path && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-red-500 rounded-full"
                        transition={{ duration: 0.3, type: "spring" as const }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Desktop Right Side */}
            <div className="hidden lg:flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="relative bg-gradient-to-r from-amber-500 to-red-500 px-6 py-2 rounded-full text-sm font-semibold text-white hover:shadow-xl transition-all inline-flex items-center gap-2 overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amber-600 to-red-600"
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <Sparkles size={14} className="relative z-10" />
                  <span className="relative z-10">Get Quote</span>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Hamburger Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-all duration-300"
              whileTap={{ scale: 0.9 }}
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Side Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden w-full h-full"
              transition={{ duration: 0.3 }}
            />
            
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 left-0 bottom-0 w-full max-w-xs bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <motion.div 
                  variants={mobileItemVariants}
                  className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700"
                >
                  <motion.div 
                    className="flex items-center space-x-3"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-r from-amber-500 to-red-500 rounded-full flex items-center justify-center shadow-xl"
                      animate={pulseAnimation}
                    >
                      <Sparkles size={22} className="text-white" />
                    </motion.div>
                    <div>
                      <div className="text-sm font-bold text-white">LAKSHMI GANAPATHI</div>
                      <div className="text-[10px] text-gray-400">Events</div>
                    </div>
                  </motion.div>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg bg-white/10 text-white"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={20} />
                  </motion.button>
                </motion.div>

                <div className="space-y-2">
                  {navLinks.map((link,) => (
                    <motion.div
                      key={link.name}
                      variants={mobileItemVariants}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                          location.pathname === link.path
                            ? 'text-amber-500 bg-white/10'
                            : 'text-gray-300 hover:text-amber-500 hover:bg-white/5'
                        }`}
                      >
                        <link.icon size={18} />
                        <span className="font-medium">{link.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  variants={mobileItemVariants}
                  className="mt-6 pt-6 border-t border-gray-700"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-4"
                  >
                    <Link
                      to="/contact"
                      onClick={() => setIsOpen(false)}
                      className="block bg-gradient-to-r from-amber-500 to-red-500 text-center px-4 py-3 rounded-xl text-sm font-semibold text-white hover:shadow-xl transition-all relative overflow-hidden group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-amber-600 to-red-600"
                        initial={{ x: '100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative z-10">Get Quote</span>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation Bar - NOW WITH ALL 7 ITEMS */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" as const, delay: 0.2 }}
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-gray-800 border-t border-gray-700 z-50 shadow-2xl"
      >
        <div className="flex items-center justify-around gap-0.5 py-1.5 px-1">
          {navLinks.map((link, idx) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, type: "spring" as const }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
              <Link
                to={link.path}
                className={`flex flex-col items-center gap-0.5 py-1.5 rounded-lg transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-amber-500'
                    : 'text-gray-400 hover:text-amber-500'
                }`}
              >
                <link.icon size={18} />
                <span className="text-[8px] sm:text-[9px] font-medium">{link.name}</span>
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="mobileActiveNav"
                    className="absolute -top-1 w-1 h-1 bg-amber-500 rounded-full"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;