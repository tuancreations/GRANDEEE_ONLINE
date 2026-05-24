import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Product, SellerSegment, Shop } from '../data/mockData';
import { mockProducts, mockShops } from '../data/mockData';

type CommunicationType = 'chat' | 'voice' | 'video';
type UserRole = 'buyer' | 'seller';

export type SellerSocialLink = {
  label: string;
  handle: string;
  url: string;
};

export type SellerChannel = {
  id: number;
  name: string;
  handle: string;
  description: string;
  followerCount: number;
  active: boolean;
  lastUpdate: string;
};

export type SellerAnalytics = {
  profileViews: number;
  websiteClicks: number;
  socialClicks: number;
  inquiries: number;
  followers: number;
  channelSubscribers: number;
};

export type ShopPublicProfile = {
  website: string;
  socialLinks: SellerSocialLink[];
  channels: SellerChannel[];
  analytics: SellerAnalytics;
};

export type User = {
  name?: string;
  email: string;
  role: UserRole;
  sellerType?: SellerSegment;
};

const USER_STORAGE_KEY = 'grandee_user';
const SHOP_PROFILES_STORAGE_KEY = 'grandee_shop_public_profiles';
const FOLLOWED_CHANNELS_STORAGE_KEY = 'grandee_followed_channels';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const createDefaultShopProfile = (shop: Shop): ShopPublicProfile => {
  const slug = slugify(shop.name);
  return {
    website: `https://grandeeonline.com/stores/${slug}`,
    socialLinks: [
      {
        label: 'Instagram',
        handle: `@${slug}`,
        url: `https://instagram.com/${slug}`
      },
      {
        label: 'Facebook',
        handle: `fb.com/${slug}`,
        url: `https://facebook.com/${slug}`
      },
      {
        label: 'X',
        handle: `@${slug}`,
        url: `https://x.com/${slug}`
      }
    ],
    channels: [
      {
        id: Number(`${shop.id}1`),
        name: 'New product listings',
        handle: `@${slug}-updates`,
        description: 'Follow this channel to get alerts when new products are posted.',
        followerCount: 248 + shop.id * 12,
        active: true,
        lastUpdate: 'Today'
      },
      {
        id: Number(`${shop.id}2`),
        name: 'Offers and restocks',
        handle: `@${slug}-offers`,
        description: 'Promotion and restock alerts for interested buyers.',
        followerCount: 154 + shop.id * 9,
        active: true,
        lastUpdate: '2 days ago'
      }
    ],
    analytics: {
      profileViews: 840 + shop.id * 125,
      websiteClicks: 120 + shop.id * 18,
      socialClicks: 92 + shop.id * 14,
      inquiries: 36 + shop.id * 6,
      followers: 180 + shop.id * 20,
      channelSubscribers: 248 + shop.id * 12
    }
  };
};

const getStoredProfiles = (): Record<number, ShopPublicProfile> | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = window.localStorage.getItem(SHOP_PROFILES_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as Record<number, ShopPublicProfile>;
  } catch {
    return null;
  }
};

const getStoredFollowedChannels = (): string[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  const raw = window.localStorage.getItem(FOLLOWED_CHANNELS_STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const buildInitialShopProfiles = (): Record<number, ShopPublicProfile> => {
  const storedProfiles = getStoredProfiles();
  return mockShops.reduce<Record<number, ShopPublicProfile>>((profiles, shop) => {
    const defaults = createDefaultShopProfile(shop);
    const stored = storedProfiles?.[shop.id];
    profiles[shop.id] = {
      website: stored?.website ?? defaults.website,
      socialLinks: stored?.socialLinks ?? defaults.socialLinks,
      channels: stored?.channels ?? defaults.channels,
      analytics: {
        ...defaults.analytics,
        ...stored?.analytics
      }
    };
    return profiles;
  }, {});
};

const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = window.localStorage.getItem(USER_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as User;
    if (!parsed?.email || (parsed.role !== 'buyer' && parsed.role !== 'seller')) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
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
  fulfillmentMode: 'grandee' | 'seller';
  pickupAvailable: boolean;
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

type CartItem = {
  productId: number;
  quantity: number;
};

export type BuyerMarketPartition =
  | 'retail'
  | 'manufacturer-distributor'
  | 'wholesale-farmer'
  | 'professional-services'
  | 'institution';

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
  cartItems: CartItem[];
  wishlistItems: number[];
  cartCount: number;
  wishlistCount: number;
  getProductById: (id: number) => Product | undefined;
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  buyerMarketPartition: BuyerMarketPartition;
  setBuyerMarketPartition: (partition: BuyerMarketPartition) => void;
  shopPublicProfiles: Record<number, ShopPublicProfile>;
  getShopPublicProfile: (shopId: number) => ShopPublicProfile | undefined;
  updateShopPublicProfile: (shopId: number, updates: Partial<ShopPublicProfile>) => void;
  addShopChannel: (shopId: number, channel: Omit<SellerChannel, 'id' | 'followerCount' | 'active' | 'lastUpdate'>) => void;
  toggleChannelFollow: (shopId: number, channelId: number) => void;
  isChannelFollowed: (shopId: number, channelId: number) => boolean;
  recordShopView: (shopId: number) => void;
  recordLinkClick: (shopId: number, type: 'website' | 'social') => void;
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
  const [user, setUser] = useState<User | null>(getStoredUser);
  const [shopPublicProfiles, setShopPublicProfiles] = useState<Record<number, ShopPublicProfile>>(buildInitialShopProfiles);
  const [followedChannelKeys, setFollowedChannelKeys] = useState<string[]>(getStoredFollowedChannels);
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
      fulfillmentMode: 'grandee',
      pickupAvailable: true,
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
      fulfillmentMode: 'seller',
      pickupAvailable: false,
      createdAt: Date.now() - 172800000,
      isActive: true
    }
  ]);
  const [activeCommunication, setActiveCommunication] = useState<ActiveCommunication | null>(null);
  const [sellerLocation, setSellerLocation] = useState<SellerLocation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);
  const [buyerMarketPartition, setBuyerMarketPartition] = useState<BuyerMarketPartition>('retail');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (user) {
      window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(SHOP_PROFILES_STORAGE_KEY, JSON.stringify(shopPublicProfiles));
  }, [shopPublicProfiles]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(FOLLOWED_CHANNELS_STORAGE_KEY, JSON.stringify(followedChannelKeys));
  }, [followedChannelKeys]);

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

  const getProductById = (id: number) => mockProducts.find((item) => item.id === id);

  const addToCart = (productId: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleWishlist = (productId: number) => {
    setWishlistItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: number) => wishlistItems.includes(productId);

  const getShopPublicProfile = (shopId: number) => shopPublicProfiles[shopId];

  const updateShopPublicProfile = (shopId: number, updates: Partial<ShopPublicProfile>) => {
    setShopPublicProfiles((prev) => {
      const current = prev[shopId] ?? createDefaultShopProfile(mockShops[0]);
      return {
        ...prev,
        [shopId]: {
          ...current,
          ...updates,
          socialLinks: updates.socialLinks ?? current.socialLinks,
          channels: updates.channels ?? current.channels,
          analytics: {
            ...current.analytics,
            ...updates.analytics
          }
        }
      };
    });
  };

  const addShopChannel = (
    shopId: number,
    channel: Omit<SellerChannel, 'id' | 'followerCount' | 'active' | 'lastUpdate'>
  ) => {
    setShopPublicProfiles((prev) => {
      const current = prev[shopId] ?? createDefaultShopProfile(mockShops[0]);
      const nextId = (current.channels[current.channels.length - 1]?.id ?? shopId * 10) + 1;
      const nextChannel: SellerChannel = {
        id: nextId,
        name: channel.name,
        handle: channel.handle,
        description: channel.description,
        followerCount: 0,
        active: true,
        lastUpdate: 'Just now'
      };

      return {
        ...prev,
        [shopId]: {
          ...current,
          channels: [nextChannel, ...current.channels],
          analytics: {
            ...current.analytics,
            channelSubscribers: current.analytics.channelSubscribers + 1
          }
        }
      };
    });
  };

  const toggleChannelFollow = (shopId: number, channelId: number) => {
    const followKey = `${shopId}:${channelId}`;
    const isFollowing = followedChannelKeys.includes(followKey);

    setFollowedChannelKeys((prev) =>
      isFollowing ? prev.filter((key) => key !== followKey) : [...prev, followKey]
    );

    setShopPublicProfiles((prev) => {
      const current = prev[shopId];
      if (!current) {
        return prev;
      }

      return {
        ...prev,
        [shopId]: {
          ...current,
          channels: current.channels.map((channel) => {
            if (channel.id !== channelId) {
              return channel;
            }

            return {
              ...channel,
              followerCount: Math.max(0, channel.followerCount + (isFollowing ? -1 : 1)),
              lastUpdate: 'Just now'
            };
          }),
          analytics: {
            ...current.analytics,
            followers: Math.max(0, current.analytics.followers + (isFollowing ? -1 : 1)),
            channelSubscribers: Math.max(0, current.analytics.channelSubscribers + (isFollowing ? -1 : 1))
          }
        }
      };
    });
  };

  const isChannelFollowed = (shopId: number, channelId: number) =>
    followedChannelKeys.includes(`${shopId}:${channelId}`);

  const recordShopView = (shopId: number) => {
    setShopPublicProfiles((prev) => {
      const current = prev[shopId];
      if (!current) {
        return prev;
      }

      return {
        ...prev,
        [shopId]: {
          ...current,
          analytics: {
            ...current.analytics,
            profileViews: current.analytics.profileViews + 1
          }
        }
      };
    });
  };

  const recordLinkClick = (shopId: number, type: 'website' | 'social') => {
    setShopPublicProfiles((prev) => {
      const current = prev[shopId];
      if (!current) {
        return prev;
      }

      return {
        ...prev,
        [shopId]: {
          ...current,
          analytics: {
            ...current.analytics,
            websiteClicks: current.analytics.websiteClicks + (type === 'website' ? 1 : 0),
            socialClicks: current.analytics.socialClicks + (type === 'social' ? 1 : 0)
          }
        }
      };
    });
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

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
    updateSellerLocation,
    cartItems,
    wishlistItems,
    cartCount,
    wishlistCount,
    getProductById,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    toggleWishlist,
    isInWishlist,
    buyerMarketPartition,
    setBuyerMarketPartition,
    shopPublicProfiles,
    getShopPublicProfile,
    updateShopPublicProfile,
    addShopChannel,
    toggleChannelFollow,
    isChannelFollowed,
    recordShopView,
    recordLinkClick
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
