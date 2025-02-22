import express from 'express';

import { AdminAduthController } from '../controllers/admin/auth.controller';
import { AdminRepo } from '../repo/admin/admin.repo';
import { AdminAuthService } from '../services/admin/auth.services';
import { verifyToken } from '../middlewares/auth.middleware';
import { ProfileController } from '../controllers/admin/profile.controller';
import { ProfileService } from '../services/admin/profile.services';
import { UserMangementController } from '../controllers/admin/user-manage.controller';
import { UserMangeService } from '../services/admin/user-mange.services';
import { InstructorMangementController } from '../controllers/admin/instructor-mange.controller';
import { InstructorMangeService } from '../services/admin/instructor-manage.services';
import upload from '../configs/multer';

export const adminRouter = express.Router();

// repository dependency
const adminRepository = new AdminRepo();

// service dependency
const adminAuthService = new AdminAuthService(adminRepository);
const profileService = new ProfileService(adminRepository);
const userManageService = new UserMangeService(adminRepository);
const instructorMangeService = new InstructorMangeService(adminRepository);

// authentication controller
const authController = new AdminAduthController(adminAuthService);

// profle controller
const profileController = new ProfileController(profileService);

// user mangement controller
const userMangementController = new UserMangementController(userManageService);

// user mangement controller
const instructorMangementController = new InstructorMangementController(instructorMangeService);

// auth routes
adminRouter.post('/login', (req, res) => authController.login(req, res));

// profile routes
adminRouter.get('/getUser', verifyToken, (req, res) => profileController.adminDetails(req, res));
adminRouter.get('/getImage', verifyToken, (req, res) => profileController.userImage(req, res));
adminRouter.put('/profileUpdate', verifyToken, (req, res) => profileController.updateAdmin(req, res));
adminRouter.post('/profile-photo',verifyToken, upload.single('profilePhoto'), (req, res) => profileController.uploadProfile(req, res));
adminRouter.post('/change-password', verifyToken, (req, res) => profileController.changePassword(req, res));

// user management routes
adminRouter.get('/getAllUser',  (req, res) => userMangementController.allUserDetails(req, res));
adminRouter.patch('/changeStatus/status',  (req, res) => userMangementController.changeStatus(req, res));

// instructor mangement routes
adminRouter.get('/getAllInstructor',  (req, res) => instructorMangementController.allInstructorDetails(req, res));
adminRouter.patch('/changeStatusIns/status',  (req, res) => instructorMangementController.changeStatus(req, res));

