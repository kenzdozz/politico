import express from 'express';
import validateInputs from '../middlewares/validateInputs';
import PartyController from '../controllers/Party';
import { partyRules } from '../middlewares/validationRules';

const router = express.Router();

router.route('/').post(validateInputs(partyRules), PartyController.createParty);
router.route('/').get(PartyController.getParties);
router.route('/:id').get(PartyController.getParty);
router.route('/:id').patch(PartyController.editParty);
router.route('/:id').delete(PartyController.deleteParty);

export default router;
