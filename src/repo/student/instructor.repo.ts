import { ObjectId } from 'mongoose';
import { Instructor } from '../../models/Instructor';
import { Notification } from '../../models/Notification';
import { User } from '../../models/User';
import { IInstructorRepoStudent, IUser } from '../../interfaces/IUser';
import bcrypt from 'bcrypt';

export class InstructorRepo implements IInstructorRepoStudent {
  async findById(id: ObjectId) {
    return await User.findById(id);
  }

  async createNotification(notificationData: any) {
    const notification = new Notification(notificationData);
    return await notification.save();
  }

  async createInstructor(instructorData: any) {
    const instructor = new Instructor(instructorData);
    return await instructor.save();
  }

  async createUser(userData: IUser): Promise<IUser | null> {
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
    const newUser = new User(userData);
    return await newUser.save();
  }
}
