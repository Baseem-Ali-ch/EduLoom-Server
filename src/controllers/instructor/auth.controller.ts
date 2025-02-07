import { Request, Response } from 'express';
import { InstructorAuthService } from '../../services/instructor/auth.services';

export class InstructorAuthController {
  private instructorAuthService: InstructorAuthService;

  constructor(instructorAuthService: InstructorAuthService) {
    this.instructorAuthService = instructorAuthService;
  }

  // registration
  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await this.instructorAuthService.register(email, password);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Error during registration' });
    }
  }

  // login
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await this.instructorAuthService.login(email, password);
      res.status(201).json(result);
    } catch (error) {
      console.log('failed to login', error);
      res.status(500).json({ message: 'Invalid credentials' });
    }
  }

  // // forget password
  async forgetPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const result = await this.instructorAuthService.forgetPassword(email);
      res.status(200).json(result);
    } catch (error) {
      console.log('failed forget password', error);
      res.status(500).json({ message: 'failed to forget password handling' });
    }
  }

  // // reset password
  async resetPassword(req: Request, res: Response) {
    try {
      const { token, password } = req.body;

      const result = await this.instructorAuthService.resetPassword(token, password);
      res.status(200).json(result);
    } catch (error) {
      console.log('failed reset password', error);
      res.status(500).json({ message: 'failed to reset password handling' });
    }
  }

}
