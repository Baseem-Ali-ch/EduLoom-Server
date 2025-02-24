import { instructorCourseService } from 'src/services/instructor/course.services';
import { Response } from 'express';
import logger from '../../configs/logger';
import { CourseDTO } from '../../dtos/dto';
import { MapCourse } from '../../mappers/mapper';

export class instructorCourseController {
  private _instructorCourseService: instructorCourseService;

  constructor(instructorCourseService: instructorCourseService) {
    this._instructorCourseService = instructorCourseService;
  }

  async createCourse(req: any, res: Response) {
    try {
      const instructorId = req.userId;
      console.log('course data from body', req.body)
      const dto = new CourseDTO(req.body.courseData);
      console.log('dto', dto)
      const courseData = MapCourse(dto, instructorId);
      console.log('course data map', courseData)
      const result = await this._instructorCourseService.createCourse(courseData, instructorId);
      res.status(200).json({message: 'Course created successfully', result});
    } catch (error) {
      console.log('Failed to create course', error);
      logger.error('Error during course creation', error);
      res.status(500).json({ message: 'Error during course creation' });
    }
  }
}
