import express from 'express';
import validateInputs from '../middlewares/validateInputs';
import OfficeController from '../controllers/Office';
import { officeRules } from '../middlewares/validationRules';
import { authenticated, isAdmin } from '../middlewares/authentication';

const router = express.Router();

router.route('/').post(authenticated, isAdmin, validateInputs(officeRules), OfficeController.createOffice);
router.route('/').get(authenticated, OfficeController.getOffices);
router.route('/:id').get(authenticated, OfficeController.getOffice);

export default router;
