import { adminCourseService } from 'src/services/admin/course.services';
import { Response, Request } from 'express';
import { CouponDTO, OfferDTO } from '../../dtos/dto';
import { MapCoupon, MapOffer } from '../../mappers/mapper';
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

  async getCoupon(req: Request, res: Response) {
    try {
      console.log('body', req.body);
      const result = await this._adminCourseService.getCoupons();
      res.status(200).json({ result });
    } catch (error) {
      console.log('failed to get coupons', error);
      logger.error('Controller : Error get coupons', error);
      res.status(500).json({ message: 'Error get coupons' });
    }
  }

  async addCoupon(req: Request, res: Response) {
    try {
      console.log('req', req.body.couponData);
      
      const dto = new CouponDTO(req.body.couponData);
      const couponData = MapCoupon(dto);
      const result = await this._adminCourseService.addCoupon(couponData);
      res.status(200).json({ message: 'Coupon Created', result });
    } catch (error) {
      console.log('failed to create coupon', error);
      logger.error('Controller : Error creating coupon', error);
      res.status(500).json({ message: 'Error creating coupon' });
    }
  }

  async couponChangeStatus(req: Request, res: Response) {
    try {
      const { id, status } = req.body;
      const updatedCoupon = await this._adminCourseService.couponChangeStatus(id, status);
      res.status(200).json({ coupon: updatedCoupon, message: 'Coupon status changed' });
    } catch (error) {
      console.log('Error updating coupon status', error);
      logger.error('Controller : Error updating coupon status', error);
      res.status(500).json({ message: 'Error updating coupon status', error });
    }
  }
}
