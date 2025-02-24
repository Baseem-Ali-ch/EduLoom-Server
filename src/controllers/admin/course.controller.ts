import { adminCourseService } from 'src/services/admin/course.services';
import { Response, Request } from 'express';
import { OfferDTO } from '../../dtos/dto';
import { MapOffer } from '../../mappers/mapper';
import logger from '../../configs/logger';
// import logger from '../../configs/logger';
// import { CourseDTO } from '../../dtos/dto';
// import { MapCourse } from '../../mappers/mapper';

export class AdminCourseController {
  private _adminCourseService: adminCourseService;

  constructor(adminCourseService: adminCourseService) {
    this._adminCourseService = adminCourseService;
  }

  async getOffer(req: Request, res: Response) {
    try {
      console.log('body', req.body);
      const result = await this._adminCourseService.getOffers();
      res.status(200).json({ result });
    } catch (error) {
      console.log('failed to get offers', error);
      logger.error('Controller : Error get offers', error);
      res.status(500).json({ message: 'Error get offers' });
    }
  }

  async addOffer(req: Request, res: Response) {
    try {
      const dto = new OfferDTO(req.body.offerData);
      const offerData = MapOffer(dto);
      const result = await this._adminCourseService.addOffer(offerData);
      res.status(200).json({ message: 'Offer Created', result });
    } catch (error) {
      console.log('failed to create offer', error);
      logger.error('Controller : Error creating offer', error);
      res.status(500).json({ message: 'Error creating offer' });
    }
  }

  async changeStatus(req: Request, res: Response) {
    try {
      const { id, status } = req.body;
      const updatedOffer = await this._adminCourseService.changeStatus(id, status);
      res.status(200).json({ offer: updatedOffer, message: 'Offer status changed' });
    } catch (error) {
      console.log('Error updating offer status', error);
      logger.error('Controller : Error updating offer status', error);
      res.status(500).json({ message: 'Error updating offer status', error });
    }
  }
}
