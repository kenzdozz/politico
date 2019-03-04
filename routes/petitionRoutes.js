import express from 'express';
import { authenticated } from '../middlewares/authentication';
import VoteController from '../controllers/Vote';
import trimInput from '../middlewares/trimInput';

const router = express.Router();

router.route('/').post(authenticated, trimInput, VoteController.petition);

export default router;
