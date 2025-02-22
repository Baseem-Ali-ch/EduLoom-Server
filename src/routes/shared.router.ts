import express from 'express';
import { SharedController } from '../controllers/shared/shared.controller';
import { SharedService } from '../services/shared/shared.services';
import { BaseRepository } from '../repo/base.repo';
import { User } from '../models/User';
import { IUser } from '../interfaces/IUser';

export const sharedRouter = express.Router();

// repository dependencies
const baseRepository = new BaseRepository<IUser>(User);

// Service dependencies
const sharedService = new SharedService(baseRepository);

// register controller
const sharedController = new SharedController(sharedService);

// authenticaiton routes
sharedRouter.post('/refresh-token', (req, res) => sharedController.handleRefreshToken(req, res));
