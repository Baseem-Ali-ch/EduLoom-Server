import { Response } from 'express';
import { InstructorProfileService } from '../../services/instructor/profile.services';

export class InstructorProfileController {
  private instructorProfileService: InstructorProfileService;
  constructor(instructorProfileService: InstructorProfileService) {
    this.instructorProfileService = instructorProfileService;
  }

  // get user details
  async instructorDetails(req: any, res: Response) {
    try {
      const instructorId = req.userId;
      const instructor = await this.instructorProfileService.instructorDetails(instructorId);
      res.status(200).json({ instructor });
    } catch (error) {
      console.log('Failed to get instructor details', error);
      res.status(500).json({ message: 'Error retrieving user details' });
    }
  }

  // update user details
  async updateInstructor(req: any, res: Response) {
    try {
      const updateData = req.body;
      const instructorId = req.userId;

      const updatedInstructor = await this.instructorProfileService.updateInstructor(instructorId, updateData);
      res.status(200).json({ message: 'Profile updated successfully', updatedInstructor });
    } catch (error) {
      console.error('Error updating user', error);
      res.status(500).json({ messgae: 'Error updating profile' });
    }
  }

  // chagne user password
  async changePassword(req: any, res: Response) {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.userId
      await this.instructorProfileService.changePassword(userId, currentPassword, newPassword);
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      console.log('failed to change password', error);
      res.status(500).json({ message: 'Failed to change password' });
    }
  }
}
