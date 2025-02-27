import { instructorCourseService } from 'src/services/instructor/course.services';
import { Request, Response } from 'express';
import logger from '../../configs/logger';
import { CourseDTO } from '../../dtos/dto';
import { MapCourse } from '../../mappers/mapper';

export class instructorCourseController {
  private _instructorCourseService: instructorCourseService;

  constructor(instructorCourseService: instructorCourseService) {
    this._instructorCourseService = instructorCourseService;
  }

  async getCourse(req: Request, res: Response) {
    try {
      console.log('body', req.body);
      const result = await this._instructorCourseService.getCourse();
      res.json({ message: 'Course find', result });
    } catch (error) {
      console.log('Failed to get course', error);
      logger.error('Error during get course', error);
      res.status(500).json({ message: 'Error during get course' });
    }
  }

  async getDoc(req: Request, res: Response): Promise<any> {
    try {
      const courseId = req.query.courseId as string; // Get courseId from query params
      if (!courseId) {
        return res.status(400).json({ message: 'Course ID is required' });
      }

      console.log('Fetching signed URLs for course:', courseId);
      const result = await this._instructorCourseService.getDoc(courseId);
      console.log('result', result)
      res.json({ message: 'Signed URLs retrieved', result });
    } catch (error) {
      console.log('Failed to get signed URLs:', error);
      logger.error('Error during getDoc:', error);
      res.status(500).json({ message: 'Error fetching signed URLs', error: error.message });
    }
  }

  // src/controllers/instructor/course.controller.ts
  async createCourse(req: any, res: Response): Promise<void> {
    try {
      const files = req.files as Express.Multer.File[];

      const courseDataString = req.body.courseData;
      if (!courseDataString) {
        throw new Error('No course data provided');
      }
      const parsedCourseData = JSON.parse(courseDataString);

      const instructorId = req.userId;
      const dto = new CourseDTO(parsedCourseData);
      const courseData = MapCourse(dto, instructorId);

      const result = await this._instructorCourseService.createCourse(courseData, instructorId, files);
      res.status(200).json({ message: 'Course created successfully', result });
    } catch (error) {
      console.log('Failed to create course:', error);
      logger.error('Error during course creation:', error);
      res.status(500).json({ message: 'Error during course creation', error: error.message });
    }
  }
}
