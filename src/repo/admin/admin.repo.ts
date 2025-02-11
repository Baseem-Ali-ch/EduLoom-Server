import { Instructor } from '../../models/Instructor';
import { IUser } from '../../interfaces/IUser';
import { User } from '../../models/User';
import bcrypt from 'bcrypt';
import { IAdminRepo } from 'src/interfaces/IAdmin';

export class AdminRepo implements IAdminRepo {
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

  async findUser(limit: number, skip: number): Promise<any> {
    return await User.find().skip(skip).limit(limit);
  }

  async findTotalUsers(): Promise<number> {
    return await User.countDocuments();
  }

  async findInstructor(): Promise<any> {
    return await Instructor.find().sort({ createdAt: -1 });
  }

  async findByIdAndUpdate(userId: string, status: boolean): Promise<any> {
    return await User.findByIdAndUpdate(userId, { isActive: status }, { new: true });
  }

  async findByIdAndUpdateIns(instructorId: string, status: boolean): Promise<any> {
    return await Instructor.findByIdAndUpdate(instructorId, { isActive: status }, { new: true });
  }
}
