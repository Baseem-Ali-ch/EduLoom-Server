import { AdminAuthService } from 'src/services/admin/auth.services';
import { Request, Response } from 'express';

export class AdminAduthController {
  private adminAuthService: AdminAuthService;
  constructor(adminAuthService: AdminAuthService) {
    this.adminAuthService = adminAuthService;
  }

  // login
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await this.adminAuthService.login(email, password);
      res.status(201).json(result);
    } catch (error) {
      console.log('failed to login', error);
      res.status(500).json({ message: 'Error during login' });
    }
  }
}
