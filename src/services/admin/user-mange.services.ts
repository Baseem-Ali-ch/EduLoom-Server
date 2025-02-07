import { AdminRepo } from '../../repo/admin/admin.repo';

export class UserMangeService {
  private adminRepository: AdminRepo;

  constructor(adminRepository: AdminRepo) {
    this.adminRepository = adminRepository;
  }

  // get all user details
  async allUserDetails() {
    const allUser = await this.adminRepository.findUser();
    return allUser;
  }
}
