import { Request, Response } from "express";
import { InstructorMangeService } from "src/services/admin/instructor-manage.services";

export class InstructorMangementController {

  private instructorMangeService: InstructorMangeService
  constructor(instructorMangeService:InstructorMangeService) {
    this.instructorMangeService = instructorMangeService;
  }

  // get all user details
  async allInstructorDetails(req: Request, res: Response) {
    try {
      console.log('body in admin controller', req.body)
      const instructors = await this.instructorMangeService.allinstructorDetails();
      res.status(200).json(instructors);
    } catch (error) {
      console.log("Failed to get admin details", error);
      res.status(500).json({ message: "Error retrieving admin details" });
    }
  }
}