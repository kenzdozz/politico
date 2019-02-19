import express from 'express';
import { authenticated, isAdmin } from '../middlewares/authentication';
import CandidateController from '../controllers/Candidate';

const router = express.Router();

router.route('/').get(authenticated, CandidateController.getCandidates);
router.route('/all').get(authenticated, isAdmin, CandidateController.getCandidates);
router.route('/:candidate').get(authenticated, CandidateController.getCandidate);
router.route('/:office/office').get(authenticated, CandidateController.getOfficeCandidates);

export default router;
