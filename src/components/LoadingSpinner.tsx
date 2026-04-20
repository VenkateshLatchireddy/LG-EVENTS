import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="loader mb-4"></div>
        <p className="text-primary font-semibold">Loading amazing content...</p>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;