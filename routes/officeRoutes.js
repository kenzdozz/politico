import express from 'express';
import validateInputs from '../middlewares/validateInputs';
import OfficeController from '../controllers/Office';

const router = express.Router();

const rules = [
  {
    name: 'name',
    rule: 'required',
    message: 'Office name is required.',
  },
  {
    name: 'name',
    rule: 'unique',
    model: 'Office',
    message: 'Office already exists.',
  },
  {
    name: 'type',
    rule: 'required',
    message: 'Office type is required.',
  },
];

router.route('/').post(validateInputs(rules), OfficeController.createOffice);
router.route('/').get(OfficeController.getOffices);

export default router;
