import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import { AuthContext } from '../App';
import { 
  fetchProperties, 
  createProperty, 
  updateProperty,
  deleteProperty 
} from '../services/propertyService';

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
const TrashIcon = getIcon('Trash');

const MainFeature = ({ activeFilter, searchQuery }) => {
  const [properties, setProperties] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

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

  // Access the authentication context
  const { isAuthenticated, user } = useContext(AuthContext);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Fetch properties from the API with filters
  const loadProperties = async () => {
    setLoading(true);
    try {
      // Build filters based on activeFilter and searchQuery
      const filters = {};

      if (activeFilter === 'sale') {
        filters.type = 'sale';
      } else if (activeFilter === 'rent') {
        filters.type = 'rent';
      } else if (activeFilter === 'new') {
        filters.new = true;
      }

      if (searchQuery) {
        filters.searchQuery = searchQuery;
      }

      const propertiesData = await fetchProperties(filters);
      setProperties(propertiesData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading properties:', error);
      toast.error('Failed to load properties');
      setProperties([]);
      setLoading(false);
    }
  };

  // Load properties initially and when filter or search changes
  useEffect(() => {
    loadProperties();
  }, [activeFilter, searchQuery]);

  const toggleFavorite = (propertyId) => {
    if (!isAuthenticated) {
      toast.info("Please log in to save favorites");
      return;
    }
    
    if (favorites.includes(propertyId)) {
      setFavorites(favorites.filter(favId => favId !== propertyId));
      toast.info("Removed from favorites");
    } else {
      setFavorites([...favorites, propertyId]);
      toast.success("Added to favorites");
    }
  };

  const handleRemoveProperty = async (propertyId) => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to perform this action");
      return;
    }

    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        setLoading(true);
        await deleteProperty(propertyId);
        
        // Update local state to remove the property
        setProperties(properties.filter(p => p.Id !== propertyId));
        
        // Remove from favorites if it was favorited
        if (favorites.includes(propertyId)) {
          setFavorites(favorites.filter(id => id !== propertyId));
        }
        
        toast.success("Property deleted successfully");
        setLoading(false);
      } catch (error) {
        console.error('Error deleting property:', error);
        toast.error("Failed to delete property");
        setLoading(false);
      }
    }
  };

  const handleContactAgent = (property) => {
    if (!isAuthenticated) {
      toast.info("Please log in to contact agents");
      return;
    }
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

  const handleAddProperty = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("You must be logged in to add properties");
      return;
    }
    
    // Validation
    if (!newProperty.title || !newProperty.price || !newProperty.address) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      // Add the required fields for a new property
      const propertyToAdd = {
        ...newProperty,
        featured: true,
        new: true
      };
      
      // Save to database
      const createdProperty = await createProperty(propertyToAdd);
      
      // Update local state with the new property
      setProperties([createdProperty, ...properties]);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding property:', error);
      toast.error("Failed to add property");
    }
    setLoading(false);
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
                key={property.Id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="property-card flex flex-col h-full"
              >
                <div className="relative">
                  <img 
                    src={property.image || "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80"} 
                    alt={property.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <button 
                    onClick={() => toggleFavorite(property.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-surface-700 transition-colors"
                    aria-label={favorites.includes(property.Id) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <HeartIcon 
                      className={`w-5 h-5 ${favorites.includes(property.Id) 
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
                   
                   <div className="flex gap-2">
                     <button 
                       onClick={() => handleContactAgent(property)}
                       className="p-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
                       aria-label="Contact agent"
                     >
                       <PhoneIcon className="w-5 h-5" />
                     </button>
                     
                     {isAuthenticated && (
                       <button 
                         onClick={() => handleRemoveProperty(property.Id)}
                         className="p-2 rounded-full bg-red-500/10 dark:bg-red-500/20 text-red-500 hover:bg-red-500/20 dark:hover:bg-red-500/30 transition-colors"
                         aria-label="Delete property"
                       >
                         <TrashIcon className="w-5 h-5" />
                       </button>
                     )}
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