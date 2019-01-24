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

partyRoutes.route('/').post(validateInputs(rules), PartyController.create);
partyRoutes.route('/').get(PartyController.getAll);
partyRoutes.route('/:id').get(PartyController.getOne);
partyRoutes.route('/:id').patch(PartyController.editOne);

export default partyRoutes;
