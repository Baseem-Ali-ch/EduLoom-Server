import { NotificationService } from 'src/services/student/notification.services';
import { Request, Response } from 'express';

export class NotificationController {
  private notificationService: NotificationService;
  constructor(notificationService: NotificationService) {
    this.notificationService = notificationService;
  }

  // get all notification
  async getNotification(req: Request, res: Response) {
    try {
      console.log('notification body', req.body);
      const notification = await this.notificationService.getNotification();
      res.status(200).json(notification );
    } catch (error) {
      console.log('Failed to get user details', error);
      res.status(500).json({ message: 'Error retrieving user details' });
    }
  }

  // upate notification status
  async updateStatus(req: Request, res: Response) {
    try {
      const { status } = req.body;
      const id = req.params.id;
      const updateNotification = await this.notificationService.updateNotification(id, status);
      res.status(200).json(updateNotification);
    } catch (error) {
      console.log('failed to update status', error);
      res.status(500).json({ message: 'Failed to update notification status' });
    }
  }

  async sendNotificationMail(req: Request, res: Response) {
    try {
      const { userId, message } = req.body;
      await this.notificationService.sendNotificationMail(userId, message);
    } catch (error) {
      res.status(500).json({ message: 'Error sending email' });
      console.log('Error sending email', error);
    }
  }
}
