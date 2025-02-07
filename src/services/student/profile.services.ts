import { ObjectId } from 'mongoose';
import { IInstructor } from 'src/interfaces/IInstructor';
import { InstructorRepo } from 'src/repo/student/instructor.repo';
import { UserRepo } from 'src/repo/student/student.repo';

export class ProfileService {
  private userRepository: UserRepo;
  private instructorRepository: InstructorRepo;

  constructor(userRepository: UserRepo, instructorRepository: InstructorRepo) {
    this.userRepository = userRepository;
    this.instructorRepository = instructorRepository;
  }

  // get all user details
  async userDetails(userId: ObjectId) {
    const user = await this.userRepository.findById(userId);
    return user;
  }

  // update user details
  async updateUserDetails(userId: ObjectId, userName: string, phone: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.userName = userName;
    user.phone = phone;

    const updatedUser = await this.userRepository.updateUser(user);
    return updatedUser;
  }

  // change password
  async changePassword(userId: ObjectId, currentPassword: string, newPassword: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await this.userRepository.passwordCompare(currentPassword, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid current password');
    }

    const changedPassword = await this.userRepository.updatePassword(user, newPassword);
    return changedPassword;
  }

  // instructor request to admin
  async instructorReq(data: IInstructor) {
    const { userName, userId, phone, place, state, qualification, workExperience, lastWorkingPlace, specialization } = data;

    if (!userId) {
      throw new Error('User  ID is required');
    }
    const user = await this.instructorRepository.findById(userId);
    if (!user) {
      throw new Error('User  not found');
    }

    const notificationData = {
      userId: userId,
      title: 'Instructor Application',
      message: `Your application to become an instructor is pending review.`,
      description:
        'We have received your application to become an instructor. Our team is currently reviewing your qualifications and experience. We aim to provide a response within 5-7 business days. Thank you for your patience.',
      status: 'pending',
    };
    await this.instructorRepository.createNotification(notificationData);

    const instructorData = {
      userName,
      email: user.email,
      phone,
      place,
      state,
      qualification,
      workExperience,
      lastWorkingPlace,
      specialization,
    };
    await this.instructorRepository.createInstructor(instructorData);
  }
}
