import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [activeCommunication, setActiveCommunication] = useState(null);
  const [sellerLocation, setSellerLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const startCommunication = (shop, type) => {
    setActiveCommunication({ shop, type, startTime: Date.now() });
    setSellerLocation({
      lat: shop.location.coordinates.lat + (Math.random() - 0.5) * 0.01,
      lng: shop.location.coordinates.lng + (Math.random() - 0.5) * 0.01,
      timestamp: Date.now()
    });
  };

  const endCommunication = () => {
    setActiveCommunication(null);
    setSellerLocation(null);
  };

  const updateSellerLocation = () => {
    if (activeCommunication && sellerLocation) {
      setSellerLocation({
        lat: sellerLocation.lat + (Math.random() - 0.5) * 0.001,
        lng: sellerLocation.lng + (Math.random() - 0.5) * 0.001,
        timestamp: Date.now()
      });
    }
  };

  const value = {
    activeCommunication,
    sellerLocation,
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
    startCommunication,
    endCommunication,
    updateSellerLocation
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
