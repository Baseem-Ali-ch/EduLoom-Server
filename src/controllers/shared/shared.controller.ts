// src/controllers/student/registration.controller.ts
import { Request, Response } from 'express';
import logger from '../../configs/logger';
import { SharedService } from '../../services/shared/shared.services';

export class SharedController {
  private _sharedService: SharedService;

  constructor(sharedService: SharedService) {
    this._sharedService = sharedService;
  }

  // refresh token
  async handleRefreshToken(req: Request, res: Response) {
    try {
      console.log('hello there handle refresh');
      const refreshToken = req.body.refreshToken; // Ensure this matches the key sent from the client
      if (!refreshToken) {
        throw new Error('Token expired');
      }
      console.log('refresh in handle refresh', refreshToken);
      const newAccessToken = await this._sharedService.refreshAccessToken(refreshToken); // Ensure this is awaited
      console.log('new token', newAccessToken);
      res.status(200).json({
        token: newAccessToken,
        message: 'Access token refreshed successfully',
      });
    } catch (error) {
      logger.error('Controller: refreshing tokens', error);
      console.log('failed to refresh token', error);
      res.status(500).json({ message: error.message });
    }
  }
}
