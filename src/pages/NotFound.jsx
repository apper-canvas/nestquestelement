import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

// Icons
const HomeIcon = getIcon('Home');
const AlertTriangleIcon = getIcon('AlertTriangle');

const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const NotFound = () => {
  return (
    <motion.div 
      className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div 
        className="w-24 h-24 mb-8 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center"
        variants={itemVariants}
      >
        <AlertTriangleIcon className="w-12 h-12 text-accent" />
      </motion.div>
      
      <motion.h1 
        className="text-4xl md:text-5xl font-bold mb-4"
        variants={itemVariants}
      >
        404
      </motion.h1>
      
      <motion.h2
        className="text-2xl md:text-3xl font-semibold mb-4"
        variants={itemVariants}
      >
        Page Not Found
      </motion.h2>
      
      <motion.p 
        className="text-surface-600 dark:text-surface-400 max-w-md mb-8"
        variants={itemVariants}
      >
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </motion.p>
      
      <motion.div variants={itemVariants}>
        <Link 
          to="/" 
          className="btn-primary flex items-center gap-2"
        >
          <HomeIcon size={18} />
          <span>Back to Home</span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;