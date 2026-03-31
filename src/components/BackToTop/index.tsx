import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Do not render on Overview page
  if (isHomePage) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, type: 'spring', bounce: 0.4 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[9999] p-3.5 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 dark:hover:bg-indigo-400 hover:-translate-y-1 transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
