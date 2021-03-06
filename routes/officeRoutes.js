import express from 'express';
import validateInputs from '../middlewares/validateInputs';
import OfficeController from '../controllers/Office';
import { officeRules } from '../middlewares/validationRules';
import { authenticated, isAdmin } from '../middlewares/authentication';
import trimInput from '../middlewares/trimInput';

const router = express.Router();

router.route('/').post(authenticated, isAdmin, trimInput, validateInputs(officeRules), OfficeController.createOffice);
router.route('/').get(authenticated, OfficeController.getOffices);
router.route('/:id').get(authenticated, OfficeController.getOffice);
router.route('/:id').patch(authenticated, isAdmin, trimInput, OfficeController.editOffice);
router.route('/:id').delete(authenticated, isAdmin, OfficeController.deleteOffice);

export default router;
