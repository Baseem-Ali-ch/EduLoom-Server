import { Instructor } from '../../models/Instructor';
import { IUser } from '../../interfaces/IUser';
import { User } from '../../models/User';
import bcrypt from 'bcrypt';

export class AdminRepo {
  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async passwordCompare(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async updatePassword(user: IUser, password: string): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return await User.updateOne({ email: user.email }, { password: hashedPassword });
  }

  async updateUser(user: IUser): Promise<IUser | null> {
    return await User.findByIdAndUpdate(user._id, user, { new: true });
  }

  async findById(adminId: string): Promise<IUser | null> {
    return await User.findById(adminId);
  }

  async findUser(): Promise<any> {
    return await User.find().sort({ createdAt: -1 });
  }

  async findInstructor(): Promise<any> {
    return await Instructor.find().sort({ createdAt: -1 });
  }
}
