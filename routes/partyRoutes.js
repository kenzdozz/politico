import express from 'express';
import validateInputs from '../middlewares/validateInputs';
import PartyController from '../controllers/Party';
import { partyRules } from '../middlewares/validationRules';
import { authenticated, isAdmin } from '../middlewares/authentication';
import multerUpload from '../middlewares/multerUpload';

const router = express.Router();

router.route('/').post(authenticated, isAdmin, multerUpload('logo'), validateInputs(partyRules), PartyController.createParty);
router.route('/:id').patch(authenticated, isAdmin, PartyController.editParty);
router.route('/:id').delete(authenticated, isAdmin, PartyController.deleteParty);
router.route('/').get(authenticated, PartyController.getParties);
router.route('/:id').get(authenticated, PartyController.getParty);

export default router;
