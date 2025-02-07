import { AdminRepo } from 'src/repo/admin/admin.repo';
import jwt from 'jsonwebtoken';

export class AdminAuthService {
  private adminRepository: AdminRepo;
  constructor(adminRepository: AdminRepo) {
    this.adminRepository = adminRepository;
  }

  // login
  async login(email: string, password: string) {
    const user = await this.adminRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await this.adminRepository.passwordCompare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || '', { expiresIn: '1d' });
    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.userName,
      },
    };
  }
}
