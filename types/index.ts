export type TSocialLinks = {
  youtube?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  github?: string;
  website?: string;
};

type AccountInfo = {
  totalPosts: number;
  totalReads: number;
};

type PersonalInfo = {
  fullName: string;
  email: string;
  password: string;
  oldPassword?: string;
  moreOldPassword?: string;
  username: string;
  bio?: string;
  profileImg?: string;
};

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phoneNumber?: string;
  address?: string;
  isVerified?: Boolean;
  isBlocked?: Boolean;
  shouldSendEmail?: Boolean;
  profileImg: string | null;
  updatedAt: string;
  createdAt: string;
  Currency?: {
    amount: number;
  };
}

export enum UserRole {
  User = 'user',
  Admin = 'admin',
  FinanceAdmin = 'financeAdmin',
  CustomerCare = 'customerCare',
}
export type TTokenUser = {
  email: string;
  name: string;
  id: string;
  profileImg: string;
  role: string;
  createAt: Date;
  isVerified: boolean;
  isBlocked: boolean;
  failedLoginAttempt: number;
};

export interface TFlat {
  id: string;
  location: string;
  description: string;
  amount: number;
  squareFeet: number;
  totalBedrooms: number;
  totalRooms: number;
  amenities: string[];
  photos: string[];
  availability: boolean;
  advanceAmount: number;
  createdAt: string;
  updatedAt: string;
  postedById: string;
}

export const USER_ROLE = {
  admin: 'admin',
  user: 'user',
  financeAdmin: 'financeAdmin',
  customerCare: 'customerCare',
} as const;

export const BookingStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

export const NotificationType = {
  comment: 'comment',
  reply: 'reply',
  like: 'like',
};

export type TUserRole = keyof typeof USER_ROLE;

export interface Activity {
  total_likes: number;
  total_comments: number;
  total_reads: number;
  total_parent_comments: number;
}

export interface TBlog {
  _id: string;
  slug: string;
  title: string;
  banner: string;
  description: string;
  content?: unknown[];
  tags: string[];
  author: {
    personalInfo: PersonalInfo;
    _id: string;
  };
  activity: Activity;
  comments?: string;
  draft: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface TNotification {
  deletedDocCount: string;
}

export interface IService {
  category: string;
  dripfeed: boolean;
  max: string;
  min: string;
  name: string;
  rate: string;
  refill: boolean;
  service: string;
  type: string;
}

export interface CategorizedService {
  name: string;
  services: IService[];
}
export type TSmsPoolService = {
  ID: number;
  name: string;
  favourite: number;
};

export type TSmsPoolServiceCountry = {
  success_rate: number;
  price: string;
  low_price: string;
  country_id: string;
  name: string;
  short_name: string;
  stock: number;
};

// Enum for ECryptoType
export enum ECryptoType {
  USDT = 'USDT',
  USDC = 'USDC',
  BTC = 'BTC',
  SOLANA = 'SOLANA',
}

// TypeScript interface for Bank model
export interface Bank {
  id: string; // UUID
  accountNumber: string;
  accountName: string;
  bankName: string;
  isActive: boolean; // Default: true
  createdAt: Date; // Default: now()
  updatedAt: Date; // Updated automatically
  manualCurrencyRequests?: ManualCurrencyRequest[]; // Related entries
}

// TypeScript interface for CryptoBank model
export interface CryptoBank {
  id: string; // UUID
  walletAddress: string;
  cryptoType: ECryptoType;
  isTrc?: boolean; // Optional
  isActive: boolean; // Default: true
  createdAt: Date; // Default: now()
  updatedAt: Date; // Updated automatically
  manualCurrencyRequests?: ManualCurrencyRequest[]; // Related entries
}

// TypeScript interface for Bank model
export interface Bank {
  id: string; // UUID
  accountNumber: string;
  accountName: string;
  bankName: string;
  isActive: boolean; // Default: true
  createdAt: Date; // Default: now()
  updatedAt: Date; // Updated automatically
  manualCurrencyRequests?: ManualCurrencyRequest[]; // Related entries
}

// TypeScript interface for CryptoBank model
export interface CryptoBank {
  id: string; // UUID
  walletAddress: string;
  name: string;
  isActive: boolean; // Default: true
  createdAt: Date; // Default: now()
  updatedAt: Date; // Updated automatically
  manualCurrencyRequests?: ManualCurrencyRequest[]; // Related entries
}
export enum EStatusOfManualCurrencyRequest {
  pending = 'pending',
  approved = 'approved',
  denied = 'denied',
}
// Interface for ManualCurrencyRequest
export interface ManualCurrencyRequest {
  // Define this based on your Prisma schema if available
  id: string; // UUID
  message?: string; // Optional
  image?: string; // Optional
  requestedAmount: number; // Required
  receivedAmount?: number; // Optional
  ownById: string; // Related User ID
  status: EStatusOfManualCurrencyRequest; // Default: pending
  accountName?: string; // Optional
  accountNumber?: string; // Optional
  bankName?: string; // Optional
  transactionHash?: string; // Optional
  dollarRate: number; // Optional
  ownBy: IUser; // Relation to User model
  createdAt: Date; // Default: now()
  updatedAt: Date; // Updated automatically
  bankId?: string; // Optional, related Bank ID
  bank?: Bank; // Optional relation to Bank model
  cryptoBankId?: string; // Optional, related CryptoBank ID
  cryptoBank?: CryptoBank; // Optional relation to CryptoBank model
}

export enum ESmsPoolOrderStatus {
  pending = 'pending',
  completed = 'completed',
  cancelled = 'cancelled',
  refunded = 'refunded',
}
export type IOrderHistory = {
  cost: string;
  order_code: string;
  phonenumber: string;
  cc: string;
  number: string;
  code: string;
  full_code: string;
  short_name: string;
  service: string;
  status: string;
  pool_name: string;
  pool: number;
  timestamp: string;
  completed_on: string;
  expiry: number;
  time_left: number;
};
export interface SmsPoolOrder {
  id: string; // UUID
  serviceId: string;
  countryId: string;
  orderId: string;
  phoneNumber: string;
  number: string;
  pool: string;
  cc: string;
  orderById: string;
  country: string;
  service: string;
  status: ESmsPoolOrderStatus; // Default: pending
  orderBy: IUser; // Relation to User model
  cost: number;
  createdAt: Date; // Default: now()
  updatedAt: Date; // Updated automatically
}

export type ISmsPoolOrderDetails = {
  info: SmsPoolOrder;
  details: IOrderHistory;
};
