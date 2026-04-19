import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Shop } from '../data/mockData';

type CommunicationType = 'chat' | 'voice' | 'video';
type UserRole = 'buyer' | 'seller';

type User = {
  name?: string;
  email: string;
  role: UserRole;
};

export type SellerListing = {
  id: number;
  title: string;
  category: string;
  price: number;
  currency: string;
  stock: number;
  description: string;
  imageUrl: string;
  location: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  createdAt: number;
  isActive: boolean;
};

type SellerLocation = {
  lat: number;
  lng: number;
  timestamp: number;
};

type ActiveCommunication = {
  shop: Shop;
  type: CommunicationType;
  startTime: number;
};

type AppContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  sellerListings: SellerListing[];
  addSellerListing: (listing: Omit<SellerListing, 'id' | 'createdAt' | 'isActive'>) => void;
  updateSellerListing: (id: number, listing: Omit<SellerListing, 'id' | 'createdAt' | 'isActive'>) => void;
  toggleListingStatus: (id: number) => void;
  activeCommunication: ActiveCommunication | null;
  sellerLocation: SellerLocation | null;
  searchQuery: string;
  selectedCategory: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  startCommunication: (shop: Shop, type: CommunicationType) => void;
  endCommunication: () => void;
  updateSellerLocation: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [sellerListings, setSellerListings] = useState<SellerListing[]>([
    {
      id: 1,
      title: 'Premium Hass Avocados',
      category: 'Food & Beverages',
      price: 4.5,
      currency: 'USD',
      stock: 120,
      description: 'Fresh farm-picked avocados packed for local and export delivery.',
      imageUrl: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=300',
      location: 'Kampala Central Market, Kampala, Uganda',
      contactName: 'Sales Desk',
      contactPhone: '+256 700 000001',
      contactEmail: 'sales@grandeeonline.com',
      createdAt: Date.now() - 86400000,
      isActive: true
    },
    {
      id: 2,
      title: 'Sun-Dried Pineapple Packs',
      category: 'Food & Beverages',
      price: 9.99,
      currency: 'USD',
      stock: 55,
      description: 'Naturally dried pineapple slices prepared for wholesale buyers.',
      imageUrl: 'https://images.pexels.com/photos/5945761/pexels-photo-5945761.jpeg?auto=compress&cs=tinysrgb&w=300',
      location: 'Nakasero Wholesale, Kampala, Uganda',
      contactName: 'Wholesale Team',
      contactPhone: '+256 700 000002',
      contactEmail: 'wholesale@grandeeonline.com',
      createdAt: Date.now() - 172800000,
      isActive: true
    }
  ]);
  const [activeCommunication, setActiveCommunication] = useState<ActiveCommunication | null>(null);
  const [sellerLocation, setSellerLocation] = useState<SellerLocation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const startCommunication = (shop: Shop, type: CommunicationType) => {
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

  const addSellerListing = (listing: Omit<SellerListing, 'id' | 'createdAt' | 'isActive'>) => {
    setSellerListings((prev) => [
      {
        ...listing,
        id: prev.length ? prev[0].id + 1 : 1,
        createdAt: Date.now(),
        isActive: true
      },
      ...prev
    ]);
  };

  const toggleListingStatus = (id: number) => {
    setSellerListings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  const updateSellerListing = (
    id: number,
    listing: Omit<SellerListing, 'id' | 'createdAt' | 'isActive'>
  ) => {
    setSellerListings((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...listing
            }
          : item
      )
    );
  };

  const value: AppContextType = {
    user,
    setUser,
    sellerListings,
    addSellerListing,
    updateSellerListing,
    toggleListingStatus,
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
