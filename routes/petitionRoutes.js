import express from 'express';
import { authenticated } from '../middlewares/authentication';
import VoteController from '../controllers/Vote';

const router = express.Router();

router.route('/').post(authenticated, VoteController.petition);

export default router;
