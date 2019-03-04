import express from 'express';
import { authenticated, isAdmin } from '../middlewares/authentication';
import CandidateController from '../controllers/Candidate';
import VoteController from '../controllers/Vote';
import trimInput from '../middlewares/trimInput';
import UserController from '../controllers/User';

const router = express.Router();

router.route('/petitions').post(authenticated, trimInput, VoteController.petition);
router.route('/office/register/:office').post(authenticated, trimInput, CandidateController.expressInterest);
router.route('/office/:user/register').post(authenticated, isAdmin, CandidateController.approveCandidate);
router.route('/office/:office/result').post(authenticated, VoteController.officeResults);
router.route('/stats').get(authenticated, isAdmin, UserController.adminStats);

export default router;
