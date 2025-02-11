// src/controllers/student/registration.controller.ts
import { Request, Response } from 'express';
import { AuthService } from '../../services/student/auth.services';
import { IUser } from 'src/interfaces/IUser';
import logger from '../../configs/logger';

export class AuthController {
  private _authService: AuthService;

  constructor(authService: AuthService) {
    this._authService = authService;
  }

  // registration
  async register(req: Request, res: Response) {
    try {
      console.log('');
      const { user } = req.body;
      const result = await this._authService.register(user as IUser);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error during registration:', error);
      logger.error('Controller : Error during registration', error);
      res.status(500).json({ message: 'Error during registration' });
    }
  }

  // verify otp
  async verifyOtp(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;
      const result = await this._authService.verifyOTP(email, otp);
      res.status(200).json(result);
    } catch (error) {
      console.log('Error verify otp', error);
      logger.error('Controller : Error during otp verification', error);
      res.status(500).json({ message: 'Error during otp verify' });
    }
  }

  // resend otp
  async resendotp(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const result = await this._authService.resendOTP(email);
      res.status(200).json(result);
    } catch (error) {
      console.log('Failed to resend OTP:', error);
      logger.error('Controller : Error to send OTP', error);
      res.status(500).json({ message: 'Failed to send OTP' });
    }
  }

  // login
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await this._authService.login(email, password);
      res.status(201).json(result);
    } catch (error) {
      console.log('failed to login', error);
      logger.error('Controller : Error during login', error);
      res.status(500).json({ message: 'Error during login' });
    }
  }

  // forget password
  async forgetPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const result = await this._authService.forgetPassword(email);
      res.status(200).json(result);
    } catch (error) {
      console.log('failed forget password', error);
      logger.error('Controller : Error forget password', error);
      res.status(500).json({ message: 'failed to forget password handling' });
    }
  }

  // reset password
  async resetPassword(req: Request, res: Response) {
    try {
      const { token, password } = req.body;

      const result = await this._authService.resetPassword(token, password);
      res.status(200).json(result);
    } catch (error) {
      console.log('failed reset password', error);
      logger.error('Controller : Error reset password', error);
      res.status(500).json({ message: 'failed to reset password handling' });
    }
  }

  // login with google
  async googleAuth(req: Request, res: Response) {
    try {
      const { token } = req.body;
      const result = await this._authService.googleAuth(token);
      res.status(200).json(result);
    } catch (error) {
      console.error('Google authentication error:', error);
      logger.error('Controller : Error google authentication', error);
      res.status(500).json({ message: 'Authentication failed' });
    }
  }
}
