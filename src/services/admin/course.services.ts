import { OfferDTO } from 'src/dtos/dto';
import { CourseRepo } from '../../repo/admin/course.repo';

export class adminCourseService {
  private _courseRepository: CourseRepo;

  constructor(courseRepo: CourseRepo) {
    this._courseRepository = courseRepo;
  }

  async getOffers(){
    const offers = await this._courseRepository.findAll()
    return offers
  }

  async addOffer(offerData: OfferDTO) {
    const offer = await this._courseRepository.create(offerData)
    return offer
  }

  async changeStatus(userId: string, status: boolean) {
    console.log('user id', userId, status);
    const changed = await this._courseRepository.updateById(userId, {isActive: status});
    return changed;
  }
}
