import { Course } from '../../models/Course';
import { ICourse} from '../../interfaces/IInstructor';
import { BaseRepository } from '../base.repo';

export class CourseRepo extends BaseRepository<ICourse> {
  constructor() {
    super(Course);
  }
}
