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
}

export interface CartItem extends Product {
  quantity: number;
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
  rating: number;
  comment: string;
  date: string;
  helpful: number;
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
}