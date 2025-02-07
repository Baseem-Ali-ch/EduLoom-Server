// src/controllers/student/registration.controller.ts
import { Request, Response } from 'express';
import { AuthService } from '../../services/student/auth.services';
import { IUser } from 'src/interfaces/IUser';

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  // registration
  async register(req: Request, res: Response) {
    try {
      console.log('');
      const { user } = req.body;
      const result = await this.authService.register(user as IUser);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Error during registration' });
    }
  }

  // verify otp
  async verifyOtp(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;
      const result = await this.authService.verifyOTP(email, otp);
      res.status(200).json(result);
    } catch (error) {
      console.log('Error verify otp', error);
      res.status(500).json({ message: 'Error during otp verify' });
    }
  }

  // resend otp
  async resendotp(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const result = await this.authService.resendOTP(email);
      res.status(200).json(result);
    } catch (error) {
      console.log('Failed to resend OTP:', error);
      res.status(500).json({ message: 'Failed to send OTP' });
    }
  }

  // login
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);
      res.status(201).json(result);
    } catch (error) {
      console.log('failed to login', error);
      res.status(500).json({ message: 'Error during login' });
    }
  }

  // forget password
  async forgetPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const result = await this.authService.forgetPassword(email);
      res.status(200).json(result);
    } catch (error) {
      console.log('failed forget password', error);
      res.status(500).json({ message: 'failed to forget password handling' });
    }
  }

  // reset password
  async resetPassword(req: Request, res: Response) {
    try {
      const { token, password } = req.body;

      const result = await this.authService.resetPassword(token, password);
      res.status(200).json(result);
    } catch (error) {
      console.log('failed reset password', error);
      res.status(500).json({ message: 'failed to reset password handling' });
    }
  }

  // login with google
  async googleAuth(req: Request, res: Response) {
    try {
      const { token } = req.body;
      const result = await this.authService.googleAuth(token);
      res.status(200).json(result);
    } catch (error) {
      console.error('Google authentication error:', error);
      res.status(500).json({ message: 'Authentication failed' });
    }
  }
}
