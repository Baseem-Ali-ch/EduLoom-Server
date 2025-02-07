import { IInstructor } from 'src/interfaces/IInstructor';
import { InstructorRepo } from 'src/repo/instructor/instructor.repo';

export class InstructorProfileService {
  private instructorRepository: InstructorRepo;

  constructor(instructorRepository: InstructorRepo) {
    this.instructorRepository = instructorRepository;
  }

  // get instructor details
  async instructorDetails(userId: string) {
    const instructor = await this.instructorRepository.findById(userId);
    return instructor;
  }

  // update instructor details
  async updateInstructor(instructorId: string, updateData: Partial<IInstructor>) {
    const instructor = await this.instructorRepository.findById(instructorId);
    if (!instructor) {
      throw new Error('Instructor not found');
    }
    Object.assign(instructor, updateData);
    return await this.instructorRepository.update(instructor);
  }

  // change password
  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const instructor = await this.instructorRepository.findById(userId);
    if (!instructor) {
      throw new Error('Instructor not found');
    }

    const isValidPassword = await this.instructorRepository.passwordCompare(currentPassword, instructor.password as string);
    if (!isValidPassword) {
      throw new Error('Invalid current password');
    }

    const changedPassword = await this.instructorRepository.updatePassword(instructor, newPassword);
    return changedPassword;
  }
}
