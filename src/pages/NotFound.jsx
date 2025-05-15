import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const MapIcon = getIcon('Map');

const NotFound = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4"
    >
      <MapIcon className="w-20 h-20 text-primary mb-6" />
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-surface-600 dark:text-surface-400 mb-8 max-w-md">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn-primary">
        Return Home
      </Link>
    </motion.div>
  );
};

export default NotFound;