import express from 'express';
import { InstructorAuthController } from '../controllers/instructor/auth.controller';
import { InstructorRepo } from '../repo/instructor/instructor.repo';
import { InstructorAuthService } from '../services/instructor/auth.services';
import { EmailService } from '../services/student/email.services';
import { verifyToken } from '../middlewares/auth.middleware';
import { InstructorProfileController } from '../controllers/instructor/profile.controller';
import { InstructorProfileService } from '../services/instructor/profile.services';

export const instructorRouter = express.Router()

// Repository dependencies
const instructorRepo = new InstructorRepo()

// Service dependencies
const emailService = new EmailService()
const instructorAuthService = new InstructorAuthService(instructorRepo, emailService);
const profileService = new InstructorProfileService(instructorRepo);
// const notificationService = new NotificationService(notificationRepo, emailService);

// register controller
const authController = new InstructorAuthController(instructorAuthService)

// profle controller
const profileController = new InstructorProfileController(profileService);

// notification controller
// const notificationController = new NotificationController(notificationService);

// authenticaiton routes
instructorRouter.post('/register', (req, res) => authController.register(req, res));
instructorRouter.post('/login', (req, res) => authController.login(req, res));
instructorRouter.post('/forget-password', (req, res) => authController.forgetPassword(req, res));
instructorRouter.post('/reset-password', (req, res) => authController.resetPassword(req, res));

// profile routes
instructorRouter.get('/getInstructor', verifyToken, (req, res) => profileController.instructorDetails(req, res));
instructorRouter.put('/profileUpdate', verifyToken, (req, res) => profileController.updateInstructor(req, res));
// instructorRouter.post('/profile-photo', verifyToken, (req, res) => profileController.uploadProfile(req, res))
instructorRouter.post('/change-password', verifyToken, (req, res) => profileController.changePassword(req, res));
