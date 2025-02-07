import { AdminRepo } from 'src/repo/admin/admin.repo';

export class ProfileService {
  private adminRepository: AdminRepo;

  constructor(adminRepository: AdminRepo) {
    this.adminRepository = adminRepository;
  }

  // get all user details
  async adminDetails(adminId: string) {
    const user = await this.adminRepository.findById(adminId);
    return user;
  }

  // update user details
  async updateAdminDetails(adminId: string, userName: string, phone: string) {
    const user = await this.adminRepository.findById(adminId);
    if (!user) {
      throw new Error('User not found');
    }

    user.userName = userName;
    user.phone = phone;

    const updatedUser = await this.adminRepository.updateUser(user);
    return updatedUser;
  }

  // change password
  async changePassword(adminId: string, oldPassword: string, newPassword: string) {
    const user = await this.adminRepository.findById(adminId);
    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await this.adminRepository.passwordCompare(oldPassword, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid current password');
    }

    const changedPassword = await this.adminRepository.updatePassword(user, newPassword);
    return changedPassword;
  }
}
