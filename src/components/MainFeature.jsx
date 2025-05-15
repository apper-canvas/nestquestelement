import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

// Icons
const HeartIcon = getIcon('Heart');
const PhoneIcon = getIcon('Phone');
const BedDoubleIcon = getIcon('BedDouble');
const BathIcon = getIcon('Bath');
const SquareIcon = getIcon('Square');
const HomeIcon = getIcon('Home');
const BuildingIcon = getIcon('Building');
const TagIcon = getIcon('Tag');
const PlusIcon = getIcon('Plus');
const XIcon = getIcon('X');
const LoaderIcon = getIcon('Loader');

// Sample property data
const sampleProperties = [
  {
    id: 1,
    title: "Modern Apartment with Balcony",
    price: 325000,
    type: "sale",
    category: "apartment",
    address: "123 Maple Street, New York, NY",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    featured: true,
    new: true
  },
  {
    id: 2,
    title: "Spacious Family Home with Garden",
    price: 750000,
    type: "sale",
    category: "house",
    address: "456 Oak Avenue, San Francisco, CA",
    bedrooms: 4,
    bathrooms: 3,
    area: 2400,
    image: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1086&q=80",
    featured: true,
    new: false
  },
  {
    id: 3,
    title: "Luxury Penthouse with City Views",
    price: 4500,
    type: "rent",
    category: "apartment",
    address: "789 Pine Boulevard, Chicago, IL",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
    featured: true,
    new: true
  },
  {
    id: 4,
    title: "Cozy Studio in Downtown",
    price: 1200,
    type: "rent",
    category: "apartment",
    address: "101 Cedar Lane, Boston, MA",
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    featured: false,
    new: true
  },
  {
    id: 5,
    title: "Renovated Townhouse with Garage",
    price: 485000,
    type: "sale",
    category: "house",
    address: "202 Elm Street, Seattle, WA",
    bedrooms: 3,
    bathrooms: 2.5,
    area: 1750,
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    featured: true,
    new: false
  },
  {
    id: 6,
    title: "Waterfront Cottage",
    price: 3200,
    type: "rent",
    category: "house",
    address: "303 Beach Road, Miami, FL",
    bedrooms: 2,
    bathrooms: 1,
    area: 900,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    featured: true,
    new: true
  }
];

const MainFeature = ({ activeFilter }) => {
  const [properties, setProperties] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProperty, setNewProperty] = useState({
    title: "",
    price: "",
    type: "sale",
    category: "apartment",
    address: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80"
  });

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setProperties(sampleProperties);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter properties based on activeFilter
  useEffect(() => {
    setLoading(true);
    
    const timer = setTimeout(() => {
      let filteredProps = [...sampleProperties];
      
      if (activeFilter === 'sale') {
        filteredProps = filteredProps.filter(p => p.type === 'sale');
      } else if (activeFilter === 'rent') {
        filteredProps = filteredProps.filter(p => p.type === 'rent');
      } else if (activeFilter === 'new') {
        filteredProps = filteredProps.filter(p => p.new);
      }
      
      setProperties(filteredProps);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [activeFilter]);

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
      toast.info("Removed from favorites");
    } else {
      setFavorites([...favorites, id]);
      toast.success("Added to favorites");
    }
  };

  const handleContactAgent = (property) => {
    toast.success(`Contact request sent for: ${property.title}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProperty({
      ...newProperty,
      [name]: name === 'price' || name === 'bedrooms' || name === 'bathrooms' || name === 'area' 
        ? value === '' ? '' : Number(value)
        : value
    });
  };

  const handleAddProperty = (e) => {
    e.preventDefault();
    
    // Validation
    if (!newProperty.title || !newProperty.price || !newProperty.address) {
      toast.error("Please fill all required fields");
      return;
    }
    
    const id = properties.length > 0 ? Math.max(...properties.map(p => p.id)) + 1 : 1;
    
    const propertyToAdd = {
      ...newProperty,
      id,
      featured: true,
      new: true
    };
    
    setProperties([propertyToAdd, ...properties]);
    setShowAddForm(false);
    toast.success("Property added successfully!");
    
    // Reset form
    setNewProperty({
      title: "",
      price: "",
      type: "sale",
      category: "apartment",
      address: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80"
    });
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h3 className="text-xl font-semibold">
          {activeFilter === 'all' ? 'All Properties' : 
           activeFilter === 'sale' ? 'Properties For Sale' : 
           activeFilter === 'rent' ? 'Properties For Rent' : 
           'New Listings'}
        </h3>
        
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary flex items-center gap-2"
        >
          {showAddForm ? <XIcon size={18} /> : <PlusIcon size={18} />}
          <span>{showAddForm ? 'Cancel' : 'Add Property'}</span>
        </button>
      </div>
      
      {/* Add Property Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-8"
          >
            <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-6 border border-surface-200 dark:border-surface-700">
              <h3 className="text-xl font-semibold mb-4">Add New Property</h3>
              
              <form onSubmit={handleAddProperty} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Title*
                  </label>
                  <input 
                    type="text" 
                    name="title"
                    value={newProperty.title}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Property title"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Price*
                  </label>
                  <input 
                    type="number" 
                    name="price"
                    value={newProperty.price}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Price"
                    min="0"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Type
                  </label>
                  <select 
                    name="type"
                    value={newProperty.type}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Category
                  </label>
                  <select 
                    name="category"
                    value={newProperty.category}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="condo">Condo</option>
                    <option value="land">Land</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Bedrooms
                  </label>
                  <input 
                    type="number" 
                    name="bedrooms"
                    value={newProperty.bedrooms}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Number of bedrooms"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Bathrooms
                  </label>
                  <input 
                    type="number" 
                    name="bathrooms"
                    value={newProperty.bathrooms}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Number of bathrooms"
                    min="0"
                    step="0.5"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Area (sq ft)
                  </label>
                  <input 
                    type="number" 
                    name="area"
                    value={newProperty.area}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Area in sq ft"
                    min="0"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Address*
                  </label>
                  <input 
                    type="text" 
                    name="address"
                    value={newProperty.address}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Complete address"
                    required
                  />
                </div>
                
                <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                  <button 
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="btn-outline"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="btn-primary"
                  >
                    Add Property
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Properties Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="flex flex-col items-center">
            <LoaderIcon className="w-10 h-10 text-primary animate-spin mb-4" />
            <p className="text-surface-600 dark:text-surface-400">Loading properties...</p>
          </div>
        </div>
      ) : properties.length === 0 ? (
        <div className="bg-surface-100 dark:bg-surface-800 rounded-xl p-8 text-center">
          <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-surface-200 dark:bg-surface-700 flex items-center justify-center">
            <HomeIcon className="w-8 h-8 text-surface-600 dark:text-surface-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No Properties Found</h3>
          <p className="text-surface-600 dark:text-surface-400 mb-6">
            There are no properties matching your current filter.
          </p>
          <button 
            onClick={() => setShowAddForm(true)} 
            className="btn-primary"
          >
            Add New Property
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {properties.map((property) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="property-card flex flex-col h-full"
              >
                <div className="relative">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <button 
                    onClick={() => toggleFavorite(property.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-surface-700 transition-colors"
                    aria-label={favorites.includes(property.id) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <HeartIcon 
                      className={`w-5 h-5 ${favorites.includes(property.id) 
                        ? 'text-red-500 fill-red-500' 
                        : 'text-surface-600 dark:text-surface-400'}`} 
                    />
                  </button>
                  
                  <div className="absolute bottom-3 left-3">
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-semibold uppercase 
                      ${property.type === 'sale' 
                        ? 'bg-primary text-white' 
                        : 'bg-secondary text-white'}
                    `}>
                      {property.type === 'sale' ? 'For Sale' : 'For Rent'}
                    </span>
                    
                    {property.new && (
                      <span className="ml-2 px-3 py-1 rounded-full text-xs font-semibold uppercase bg-accent text-white">
                        New
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-5 flex-grow flex flex-col">
                  <div className="mb-4 flex-grow">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">{property.title}</h3>
                    <p className="text-surface-600 dark:text-surface-400 text-sm mb-2 line-clamp-1">
                      {property.address}
                    </p>
                    
                    <div className="flex gap-3 mt-3">
                      <div className="flex items-center gap-1 text-surface-600 dark:text-surface-400">
                        <BedDoubleIcon className="w-4 h-4" />
                        <span className="text-sm">{property.bedrooms}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-surface-600 dark:text-surface-400">
                        <BathIcon className="w-4 h-4" />
                        <span className="text-sm">{property.bathrooms}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-surface-600 dark:text-surface-400">
                        <SquareIcon className="w-4 h-4" />
                        <span className="text-sm">{property.area} ft²</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-surface-100 dark:border-surface-700 flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <TagIcon className="w-4 h-4 text-surface-600 dark:text-surface-400" />
                      <span className="font-bold text-lg">
                        ${property.type === 'rent' 
                          ? `${property.price.toLocaleString()}/mo` 
                          : property.price.toLocaleString()}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => handleContactAgent(property)}
                      className="p-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
                      aria-label="Contact agent"
                    >
                      <PhoneIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default MainFeature;