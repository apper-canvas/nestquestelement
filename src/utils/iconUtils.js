import * as Icons from 'lucide-react';

/**
 * Helper function to get icon components from lucide-react
 * 
 * @param {string} name - The name of the icon to retrieve
 * @returns {function} - The icon component
 */
const getIcon = (name) => {
  if (!name) return null;
  
  const iconMap = {
    // Navigation icons
    Home: Icons.Home,
    Building: Icons.Building,
    MapPin: Icons.MapPin,
    Search: Icons.Search,
    
    // UI Control icons
    Menu: Icons.Menu,
    X: Icons.X,
    ChevronDown: Icons.ChevronDown,
    ChevronUp: Icons.ChevronUp,
    ChevronLeft: Icons.ChevronLeft,
    ChevronRight: Icons.ChevronRight,
    
    // Interaction icons
    Heart: Icons.Heart,
    Phone: Icons.Phone,
    Plus: Icons.Plus,
    Loader: Icons.Loader2,
    Trash: Icons.Trash,
    
    // Theme icons
    Moon: Icons.Moon,
    Sun: Icons.Sun,
    
    // Property feature icons
    BedDouble: Icons.BedDouble,
    Bath: Icons.Bath,
    Square: Icons.Square,
    Tag: Icons.Tag,
    Map: Icons.Map,
  };
  
  return iconMap[name] || Icons.HelpCircle;
};

export default getIcon;