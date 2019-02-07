import express from 'express';
import { authenticated, isAdmin } from '../middlewares/authentication';
import CandidateController from '../controllers/Candidate';
import VoteController from '../controllers/Vote';

const router = express.Router();

router.route('/register/:office').post(authenticated, CandidateController.expressInterest);
router.route('/:user/register').post(authenticated, isAdmin, CandidateController.approveCandidate);
router.route('/:office/result').post(authenticated, VoteController.officeResults);

export default router;
