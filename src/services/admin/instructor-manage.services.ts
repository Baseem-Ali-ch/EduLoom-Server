import { AdminRepo } from '../../repo/admin/admin.repo';

export class InstructorMangeService {
  private adminRepository: AdminRepo;

  constructor(adminRepository: AdminRepo) {
    this.adminRepository = adminRepository;
  }

  // get all instructor details
  async allinstructorDetails() {
    const allUser = await this.adminRepository.findInstructor();
    return allUser;
  }
}
