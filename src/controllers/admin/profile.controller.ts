import { Response } from "express";
import { ProfileService } from "src/services/admin/profile.services";

export class ProfileController {
  private profileService: ProfileService; 
  constructor(profileService: ProfileService) {
    this.profileService = profileService;
  }

  // get admin details
  async adminDetails(req: any, res: Response) {
    try {
      const adminId = req.userId;
      const user = await this.profileService.adminDetails(adminId);
      res.status(200).json({ user });
    } catch (error) {
      console.log("Failed to get admin details", error);
      res.status(500).json({ message: "Error retrieving admin details" });
    }
  }

  // update user details
  async updateAdmin(req: any, res: Response) {
    try {
      const { userName, phone } = req.body;
      const adminId = req.userId;
      const user = await this.profileService.updateAdminDetails(
        adminId,
        userName,
        phone
      );
      res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
      console.error("Error updating user", error);
      res.status(500).json({ messgae: "Error updating profile" });
    }
  }

  // chagne user password
  async changePassword(req: any, res: Response) {
    try {
      const { oldPassword, newPassword } = req.body;
      const adminId = req.userId;
      await this.profileService.changePassword(
        adminId,
        oldPassword,
        newPassword
      );
      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      console.log("failed to change password", error);
      res.status(500).json({ message: "Failed to change password" });
    }
  }

}
