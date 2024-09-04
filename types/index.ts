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
  User = "user",
  Admin = "admin"
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
  admin: "admin",
  user: "user"
} as const;

export const BookingStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED"
};

export const NotificationType = {
  comment: "comment",
  reply: "reply",
  like: "like"
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
