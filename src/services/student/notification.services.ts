import { ObjectId } from 'mongoose';
import { NotificationRepo } from 'src/repo/student/notification.repo';
import { EmailService } from './email.services';

export class NotificationService {
  private notificationRepository: NotificationRepo;
  private emailService: EmailService;

  constructor(notificationRepository: NotificationRepo, emailService: EmailService) {
    this.notificationRepository = notificationRepository;
    this.emailService = emailService;
  }

  // get all user details
  async getNotification() {
    const notification = await this.notificationRepository.find();
    return notification;
  }

  // update notification status
  async updateNotification(id: string, status: boolean) {
    const notification = await this.notificationRepository.findByIdAndUpdate(id, status);
    return notification;
  }

  async sendNotificationMail(userId: ObjectId, message: string) {
    const user = await this.notificationRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    await this.emailService.sendNotificationEmail(user, message);
  }
}
