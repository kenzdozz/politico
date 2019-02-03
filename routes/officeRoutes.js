import express from 'express';
import validateInputs from '../middlewares/validateInputs';
import OfficeController from '../controllers/Office';
import { officeRules } from '../middlewares/validationRules';

const router = express.Router();

router.route('/').post(validateInputs(officeRules), OfficeController.createOffice);
router.route('/').get(OfficeController.getOffices);
router.route('/:id').get(OfficeController.getOffice);

export default router;
