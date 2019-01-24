import express from 'express';
import Party from '../controllers/Party';
import validateInputs from '../middlewares/validateInputs';

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

partyRoutes.route('/').post(validateInputs(rules), Party.create);

export default partyRoutes;
