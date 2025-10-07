export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  images?: string[];
  stock?: number;
  variants?: ProductVariant[];
  reviews?: Review[];
  discount?: number;
  isFeatured?: boolean;
  isFlashSale?: boolean;
  flashSaleEndsAt?: string;
}

export interface ProductVariant {
  id: string;
  type: 'size' | 'color';
  value: string;
  available: boolean;
  priceModifier?: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariants?: {
    size?: string;
    color?: string;
  };
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

export interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Address extends ShippingInfo {
  id: string;
  label: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'wallet';
  last4?: string;
  cardType?: string;
  expiryDate?: string;
  isDefault: boolean;
  label: string;
}

export interface PaymentInfo {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shippingInfo: ShippingInfo;
  totalAmount: number;
  orderDate: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  estimatedDelivery?: string;
  paymentMethod?: string;
}

export interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
}

export interface Review {
  id: string;
  productId: number;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  images?: string[];
  verified: boolean;
}

export interface WishlistState {
  items: Product[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isAuthenticated: boolean;
  phone?: string;
  memberSince?: string;
  totalOrders?: number;
  addresses?: Address[];
  paymentMethods?: PaymentMethod[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minAmount?: number;
  expiryDate: string;
  isActive: boolean;
  description?: string;
}

export interface ComparisonState {
  products: Product[];
}

export interface RecentlyViewedState {
  products: Product[];
}

export interface ThemeState {
  mode: 'light' | 'dark';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  date: string;
  read: boolean;
  link?: string;
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
}

export interface SearchSuggestion {
  id: string;
  type: 'product' | 'category' | 'brand';
  text: string;
  image?: string;
  url: string;
}

export interface CurrencyState {
  current: 'USD' | 'EUR' | 'GBP' | 'INR';
  rates: {
    USD: number;
    EUR: number;
    GBP: number;
    INR: number;
  };
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  rating: number;
  sortBy: string;
  searchQuery: string;
  inStock: boolean;
  onSale: boolean;
}