import express from 'express';
import validateInputs from '../middlewares/validateInputs';
import PartyController from '../controllers/Party';

const router = express.Router();

const rules = [
  {
    name: 'name',
    rule: 'required',
    message: 'Party name is required.',
  },
  {
    name: 'name',
    rule: 'unique',
    model: 'Party',
    message: 'Party already exists.',
  },
  {
    name: 'hqAddress',
    rule: 'required',
    message: 'Headquater address is required.',
  },
  {
    name: 'logo',
    rule: 'required',
    message: 'Party logo is required.',
  },
];

router.route('/').post(validateInputs(rules), PartyController.createParty);
router.route('/').get(PartyController.getParties);
router.route('/:id').get(PartyController.getParty);
router.route('/:id').patch(PartyController.editParty);
router.route('/:id').delete(PartyController.deleteParty);

export default router;
