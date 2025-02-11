import { ProfileService } from "src/services/student/profile.services";
import { Response } from "express";
import logger from "../../configs/logger";

export class ProfileController {
  private _profileService: ProfileService;
  constructor(profileService: ProfileService) {
    this._profileService = profileService;
  }

  // get user details
  async userDetails(req: any, res: Response) {
    try {
      const userId = req.userId;
      const user = await this._profileService.userDetails(userId);
      res.status(200).json({ user });
    } catch (error) {
      console.log("Failed to get user details", error);
      logger.error('Controller : Error retrieving user details', error);
      res.status(500).json({ message: "Error retrieving user details" });
    }
  }

  // update user details
  async updateUser(req: any, res: Response) {
    try {
      const { userName, phone } = req.body;
      const userId = req.userId
      const user = await this._profileService.updateUserDetails(
        userId,
        userName,
        phone
      );
      res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
      console.error("Error updating user", error);
      logger.error('Controller : Error updating profile', error);
      res.status(500).json({ messgae: "Error updating profile" });
    }
  }

  // chagne user password
  async changePassword(req: any, res: Response) {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.userId
      await this._profileService.changePassword(
        userId,
        currentPassword,
        newPassword
      );
      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      console.log("failed to change password", error);
      logger.error('Controller : Error change password', error);
      res.status(500).json({ message: "Failed to change password" });
    }
  }

  // instructor request details
  async instructorRequest(req: any, res: Response) {
    try {
      const userId = req.userId;
      await this._profileService.instructorReq(req.body, userId);
      res.status(200).json({ message: "Request sent successfully" });
    } catch (error) {
      console.log("Failed to send request", error);
      logger.error('Controller : Error send instructor request', error);
      res.status(500).json({ message: "Failed to send request" });
    }
  }
}
