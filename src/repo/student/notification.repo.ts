import { User } from '../../models/User';
import { Notification } from '../../models/Notification';
import { ObjectId } from 'mongoose';

export class NotificationRepo {
  async find(): Promise<any> {
    return await Notification.find().sort({ createdAt: -1 });
  }

  async findByIdAndUpdate(id: string, status: boolean): Promise<any> {
    return await Notification.findByIdAndUpdate(id, { status }, { new: true });
  }

  async findById(userId: ObjectId): Promise<any> {
    return await User.findById(userId);
  }
}
