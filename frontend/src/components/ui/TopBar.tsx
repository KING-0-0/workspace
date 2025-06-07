import { useNavigate, useLocation } from 'react-router-dom';
import { 
  MessageCircle,
  Phone,
  Zap,
  Compass,
  Film,
  Search,
  ShoppingBag,
  Tag,
  Gift,
  User,
  Settings,
  BarChart2,
  Bell,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { getGradientClasses } from '../../styles/colors';

interface TopBarProps {
  currentTab: string;
  isMobile: boolean;
}

// Define sub-tabs for each main tab
const subTabsConfig = {
  messages: [
    { id: 'chat', label: 'Chat', icon: MessageCircle, path: '/messages' },
    { id: 'calls', label: 'Calls', icon: Phone, path: '/messages/calls' },
    { id: 'status', label: 'Status', icon: Zap, path: '/messages/status' }
  ],
  discover: [
    { id: 'feed', label: 'Feed', icon: Compass, path: '/discover' },
    { id: 'reels', label: 'Reels', icon: Film, path: '/discover/reels' },
    { id: 'search', label: 'Search', icon: Search, path: '/discover/search' }
  ],
  marketplace: [
    { id: 'shop', label: 'Shop', icon: ShoppingBag, path: '/marketplace' },
    { id: 'sell', label: 'Sell', icon: Tag, path: '/marketplace/sell' },
    { id: 'deals', label: 'Deals', icon: Gift, path: '/marketplace/deals' }
  ],
  profile: [
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/profile/settings' },
    { id: 'tools', label: 'Tools', icon: BarChart2, path: '/profile/tools' }
  ]
};

const TopBar = ({ currentTab, isMobile }: TopBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();

  // Get current sub-tabs based on active main tab
  const currentSubTabs = subTabsConfig[currentTab as keyof typeof subTabsConfig] || [];
  
  // Determine active sub-tab
  const getActiveSubTab = () => {
    const currentPath = location.pathname;
    const activeSubTab = currentSubTabs.find(tab => tab.path === currentPath);
    return activeSubTab?.id || currentSubTabs[0]?.id;
  };

  const activeSubTab = getActiveSubTab();
  const gradientClasses = getGradientClasses(currentTab);

  // Get enhanced tab colors based on current main tab
  const getTabColors = () => {
    switch (currentTab) {
      case 'messages':
        return {
          gradient: 'from-sky-400 via-blue-500 to-indigo-600',
          activeText: 'text-sky-600',
          activeBg: 'bg-gradient-to-r from-sky-50 to-blue-50',
          activeIndicator: 'bg-gradient-to-r from-sky-400 to-blue-500',
          glowColor: 'shadow-sky-200/50'
        };
      case 'discover':
        return {
          gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
          activeText: 'text-purple-600',
          activeBg: 'bg-gradient-to-r from-violet-50 to-purple-50',
          activeIndicator: 'bg-gradient-to-r from-violet-500 to-purple-500',
          glowColor: 'shadow-purple-200/50'
        };
      case 'marketplace':
        return {
          gradient: 'from-emerald-400 via-teal-500 to-green-600',
          activeText: 'text-emerald-600',
          activeBg: 'bg-gradient-to-r from-emerald-50 to-teal-50',
          activeIndicator: 'bg-gradient-to-r from-emerald-400 to-teal-500',
          glowColor: 'shadow-emerald-200/50'
        };
      case 'profile':
        return {
          gradient: 'from-amber-400 via-orange-500 to-red-500',
          activeText: 'text-orange-600',
          activeBg: 'bg-gradient-to-r from-amber-50 to-orange-50',
          activeIndicator: 'bg-gradient-to-r from-amber-400 to-orange-500',
          glowColor: 'shadow-orange-200/50'
        };
      default:
        return {
          gradient: 'from-slate-600 to-slate-700',
          activeText: 'text-slate-600',
          activeBg: 'bg-slate-50',
          activeIndicator: 'bg-slate-600',
          glowColor: 'shadow-slate-200/50'
        };
    }
  };

  const colors = getTabColors();

  if (isMobile) {
    return (
      <div className="relative">
        {/* Compact Mobile Sub-tabs */}
        <div className="flex px-3 py-2">
          {currentSubTabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className="flex-1 relative"
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <div className={`flex flex-col items-center py-2 px-1 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? `${colors.activeBg} ${colors.glowColor} shadow-md` 
                    : 'hover:bg-slate-50'
                }`}>
                  {/* Compact Icon */}
                  <div className={`p-1.5 rounded-lg mb-1 transition-all duration-300 ${
                    isActive 
                      ? `bg-gradient-to-br ${colors.gradient} shadow-md ${colors.glowColor}` 
                      : 'bg-slate-100 hover:bg-slate-200'
                  }`}>
                    <Icon 
                      className={`w-4 h-4 transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-slate-600'
                      }`} 
                    />
                  </div>
                  
                  {/* Label with gradient text for active state */}
                  <span className={`text-xs font-semibold transition-all duration-300 ${
                    isActive 
                      ? `bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`
                      : 'text-slate-600'
                  }`}>
                    {tab.label}
                  </span>
                </div>

                {/* Active indicator with modern design */}
                {isActive && (
                  <motion.div
                    layoutId="mobile-sub-indicator"
                    className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 ${colors.activeIndicator} rounded-full`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop Layout - Completely Redesigned
  return (
    <div className="relative">
      {/* Top Global Bar */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left: Logo and Search */}
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${colors.gradient} rounded-xl flex items-center justify-center shadow-lg ${colors.glowColor}`}>
              <span className="text-white font-bold text-lg">SM</span>
            </div>
            <h1 className={`text-xl font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
              SocialApp
            </h1>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="flex items-center bg-slate-100 hover:bg-slate-200 rounded-2xl px-4 py-2.5 transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:bg-white focus-within:shadow-lg">
              <Search className="w-5 h-5 text-slate-400 mr-3" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 w-80"
              />
            </div>
          </div>
        </div>

        {/* Right: Notifications and User */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all duration-200 group"
          >
            <Bell className="w-5 h-5 text-slate-600 group-hover:text-slate-700" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
          </motion.button>

          {/* User Profile */}
          <div className="flex items-center space-x-3 bg-slate-100 hover:bg-slate-200 rounded-2xl px-4 py-2 transition-all duration-200 cursor-pointer group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user?.fullName?.charAt(0) || 'U'}
              </span>
            </div>
            <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
              {user?.fullName || 'User'}
            </span>
          </div>

          {/* Settings */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all duration-200"
          >
            <Settings className="w-5 h-5 text-slate-600" />
          </motion.button>
        </div>
      </div>

      {/* Sub-tabs with Modern Design */}
      <div className="px-6 pb-4">
        <div className="flex space-x-2 bg-slate-100/80 backdrop-blur-sm rounded-2xl p-2">
          {currentSubTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className="relative flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <div className={`flex items-center justify-center space-x-3 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isActive 
                    ? `bg-white ${colors.activeText} shadow-lg ${colors.glowColor}` 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}>
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </div>

                {/* Active background with gradient */}
                {isActive && (
                  <motion.div
                    layoutId="desktop-sub-indicator"
                    className="absolute inset-0 bg-white rounded-xl shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    style={{ zIndex: -1 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopBar;