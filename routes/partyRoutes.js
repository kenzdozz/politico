import express from 'express';
import validateInputs from '../middlewares/validateInputs';
import PartyController from '../controllers/Party';

const partyRoutes = express.Router();

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

partyRoutes.route('/').post(validateInputs(rules), PartyController.createParty);
partyRoutes.route('/').get(PartyController.getParties);
partyRoutes.route('/:id').get(PartyController.getParty);
partyRoutes.route('/:id').patch(PartyController.editParty);
partyRoutes.route('/:id').delete(PartyController.deleteParty);

export default partyRoutes;
