import { Request, Response } from "express";
import { UserMangeService } from "../../services/admin/user-mange.services";

export class UserMangementController {

  private userManageService: UserMangeService
  constructor(userManageService:UserMangeService) {
    this.userManageService = userManageService;
  }

  // get all user details
  async allUserDetails(req: Request, res: Response) {
    try {
      console.log('body in admin controller', req.body)
      const users = await this.userManageService.allUserDetails();
      res.status(200).json(users);
    } catch (error) {
      console.log("Failed to get admin details", error);
      res.status(500).json({ message: "Error retrieving admin details" });
    }
  }
}