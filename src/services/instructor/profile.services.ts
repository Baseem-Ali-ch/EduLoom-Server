import { IInstructor, IInstructorProfileService } from 'src/interfaces/IInstructor';
import { InstructorRepo } from 'src/repo/instructor/instructor.repo';

export class InstructorProfileService implements IInstructorProfileService{
  private _instructorRepository: InstructorRepo;

  constructor(instructorRepository: InstructorRepo) {
    this._instructorRepository = instructorRepository;
  }

  // get instructor details
  async instructorDetails(userId: string) {
    const instructor = await this._instructorRepository.findById(userId);
    return instructor;
  }

  // update instructor details
  async updateInstructor(instructorId: string, updateData: Partial<IInstructor>) {
    const instructor = await this._instructorRepository.findById(instructorId);
    if (!instructor) {
      throw new Error('Instructor not found');
    }
    Object.assign(instructor, updateData);
    return await this._instructorRepository.update(instructor);
  }

  // change password
  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const instructor = await this._instructorRepository.findById(userId);
    if (!instructor) {
      throw new Error('Instructor not found');
    }

    const isValidPassword = await this._instructorRepository.passwordCompare(currentPassword, instructor.password as string);
    if (!isValidPassword) {
      throw new Error('Invalid current password');
    }

    const changedPassword = await this._instructorRepository.updatePassword(instructor, newPassword);
    return changedPassword;
  }
}
