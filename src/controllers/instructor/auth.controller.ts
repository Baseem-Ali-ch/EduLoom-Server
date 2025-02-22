import { Request, Response } from 'express';
import { InstructorAuthService } from '../../services/instructor/auth.services';
import logger from '../../configs/logger';
import { ForgetPasswordDTO, LoginDTO, RegisterDTO, ResetPasswordDTO } from '../../dtos/dto';
import { MapForgetPassword, MapLogin, MapRegister, MapResetPassword } from '../../mappers/mapper';

export class InstructorAuthController {
  private _instructorAuthService: InstructorAuthService;

  constructor(instructorAuthService: InstructorAuthService) {
    this._instructorAuthService = instructorAuthService;
  }

  // registration
  async register(req: Request, res: Response) {
    try {
      // const { email, password } = req.body.instructor;
      const dto = new RegisterDTO(req.body.instructor);
      const { email, password } = MapRegister(dto);
      const result = await this._instructorAuthService.register(email, password);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error during registration:', error);
      logger.error('Error during registration', error);
      res.status(500).json({ message: 'Error during registration' });
    }
  }

  // login
  async login(req: Request, res: Response) {
    try {
      // const { email, password } = req.body;
      const dto = new LoginDTO(req.body);
      const { email, password } = MapLogin(dto);
      const result = await this._instructorAuthService.login(email, password);
      res.status(201).json(result);
    } catch (error) {
      console.log('failed to login', error);
      logger.error('Controller : Error Invalid Credentials', error);
      res.status(500).json({ message: error.message });
    }
  }

  // // forget password
  async forgetPassword(req: Request, res: Response) {
    try {
      // const { email } = req.body;
      const dto = new ForgetPasswordDTO(req.body);
      const { email } = MapForgetPassword(dto);
      const result = await this._instructorAuthService.forgetPassword(email);
      res.status(200).json(result);
    } catch (error) {
      console.log('failed forget password', error);
      logger.error('Controller : Error forget password', error);
      res.status(500).json({ message: 'failed to forget password handling' });
    }
  }

  // // reset password
  async resetPassword(req: Request, res: Response) {
    try {
      // const { token, password } = req.body;
      const dto = new ResetPasswordDTO(req.body);
      const { token, password } = MapResetPassword(dto);
      const result = await this._instructorAuthService.resetPassword(token, password);
      res.status(200).json(result);
    } catch (error) {
      console.log('failed reset password', error);
      logger.error('Controller : Error reset password', error);
      res.status(500).json({ message: 'failed to reset password handling' });
    }
  }
}
