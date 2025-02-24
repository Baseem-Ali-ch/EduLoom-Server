import { Offer } from '../../models/offer';
import { BaseRepository } from '../base.repo';

export class CourseRepo extends BaseRepository<any> {
  constructor() {
    super(Offer);
  }
}
