import { ObjectId } from "mongoose";

export interface IUser {
  _id?: ObjectId;
  userName: string;
  email: string;
  password: string;
  phone?: string;
  profilePhoto?: string;
  googleId?: string;
  isVerified?: boolean;
  isActive?: boolean;
  isAdmin?: boolean;
}

export interface OTPDetails {
  code: string;
  expiresAt: Date;
}

export interface GoogleUser{
  _id?: ObjectId;
  userName?: string;
  email?: string;
  password?: string;
  phone?: string;
  profilePhoto?: string;
  googleId?: string;
  isVerified?: boolean;
  isActive?: boolean;
  isAdmin?: boolean;
}
