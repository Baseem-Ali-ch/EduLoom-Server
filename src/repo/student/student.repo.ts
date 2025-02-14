import { GoogleUser, IUser, IUserRepo } from 'src/interfaces/IUser';
import { User } from '../../models/User';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongoose';

export class UserRepo implements IUserRepo{
  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async passwordCompare(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async createUser(userData: IUser): Promise<IUser | null> {
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
    const newUser = new User(userData);
    return await newUser.save();
  }

  async createGoogleUser(userData: GoogleUser): Promise<GoogleUser | null> {
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password as string, salt);
    const newUser = new User(userData);
    return await newUser.save();
  }

  async updateGoogleUser(user: GoogleUser): Promise<GoogleUser | null> {
    return await User.findByIdAndUpdate(user._id, user, { new: true });
  }

  async updatePassword(user: IUser, password: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.updateOne({ email: user.email }, { password: hashedPassword });
  }

  async updateUser(user: IUser): Promise<IUser | null> {
    return await User.findByIdAndUpdate(user._id, user, { new: true });
  }

  async findById(userId: ObjectId): Promise<IUser | null> {
    return await User.findById(userId);
  }

  async findStatus(user:IUser): Promise<IUser | null> {
    return await User.findOne({ email: user.email, isActive: user.isActive === true });
  }
}


