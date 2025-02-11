import { NotificationService } from 'src/services/student/notification.services';
import { Request, Response } from 'express';
import logger from '../../configs/logger';

export class NotificationController {
  private _notificationService: NotificationService;
  constructor(notificationService: NotificationService) {
    this._notificationService = notificationService;
  }

  // get all notification
  async getNotification(req: Request, res: Response) {
    try {
      console.log('notification body', req.body);
      const notification = await this._notificationService.getNotification();
      res.status(200).json(notification );
    } catch (error) {
      console.log('Failed to get user details', error);
      logger.error('Controller : Error retrieving user details', error);
      res.status(500).json({ message: 'Error retrieving user details' });
    }
  }

  // upate notification status
  async updateStatus(req: Request, res: Response) {
    try {
      const { status } = req.body;
      const id = req.params.id;
      const updateNotification = await this._notificationService.updateNotification(id, status);
      res.status(200).json(updateNotification);
    } catch (error) {
      console.log('failed to update status', error);
      logger.error('Controller : Error update notification status', error);
      res.status(500).json({ message: 'Failed to update notification status' });
    }
  }

  async sendNotificationMail(req: Request, res: Response) {
    try {
      const { userId, message } = req.body;
      await this._notificationService.sendNotificationMail(userId, message);
    } catch (error) {
      res.status(500).json({ message: 'Error sending email' });
      logger.error('Controller : Error sending notification email', error);
      console.log('Error sending email', error);
    }
  }
}
