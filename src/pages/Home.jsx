import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

// Icons
const HomeIcon = getIcon('Home');
const BuildingIcon = getIcon('Building');
const MapPinIcon = getIcon('MapPin');
const SearchIcon = getIcon('Search');

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 }
};

const Home = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    toast.info(`Filter changed to: ${filter.charAt(0).toUpperCase() + filter.slice(1)}`);
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    toast.success(`Searching for: ${searchQuery}`);
  };
  
  return (
    <motion.div 
      className="space-y-8"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80')]"></div>
        <div className="relative z-10 px-6 py-12 md:py-20 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Find Your Dream Home with NestQuest</h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">Discover thousands of properties for sale and rent in your area. Your perfect home is just a search away.</p>
            
            <form onSubmit={handleSearch} className="relative max-w-2xl">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-surface-400" />
                  </div>
                  <input 
                    type="text" 
                    className="pl-10 form-input bg-white/90 dark:bg-surface-800/90 text-surface-800 dark:text-white" 
                    placeholder="Enter location, property type, or keyword"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn-secondary whitespace-nowrap flex items-center justify-center gap-2">
                  <SearchIcon size={18} />
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Properties</h2>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            <button 
              className={`filter-chip ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterChange('all')}
            >
              All
            </button>
            <button 
              className={`filter-chip ${activeFilter === 'sale' ? 'active' : ''}`}
              onClick={() => handleFilterChange('sale')}
            >
              For Sale
            </button>
            <button 
              className={`filter-chip ${activeFilter === 'rent' ? 'active' : ''}`}
              onClick={() => handleFilterChange('rent')}
            >
              For Rent
            </button>
            <button 
              className={`filter-chip ${activeFilter === 'new' ? 'active' : ''}`}
              onClick={() => handleFilterChange('new')}
            >
              New Listings
            </button>
          </div>
        </div>
      </section>
      
      {/* Main Feature */}
      <MainFeature activeFilter={activeFilter} />
      
      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        <div className="bg-white dark:bg-surface-800 p-6 rounded-xl shadow-card border border-surface-100 dark:border-surface-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-lg">
              <HomeIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">10,000+</h3>
              <p className="text-surface-600 dark:text-surface-400">Available Properties</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-surface-800 p-6 rounded-xl shadow-card border border-surface-100 dark:border-surface-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary/10 dark:bg-secondary/20 rounded-lg">
              <BuildingIcon className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">500+</h3>
              <p className="text-surface-600 dark:text-surface-400">Property Agents</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-surface-800 p-6 rounded-xl shadow-card border border-surface-100 dark:border-surface-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-accent/10 dark:bg-accent/20 rounded-lg">
              <MapPinIcon className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">50+</h3>
              <p className="text-surface-600 dark:text-surface-400">Cities Covered</p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;