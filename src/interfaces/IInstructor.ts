import { ObjectId } from "mongoose";

export interface IInstructor {
  _id?: ObjectId;
  userName: string;
  userId?: ObjectId
  email: string;
  phone?: string;
  place?: string
  state?: string
  qualification?:string
  workExperience?:string
  lastWorkingPlace?:string
  specialization?:string
  password?:string
  isActive?: boolean
  isVerified?: boolean
  profilePhoto?: string;

}