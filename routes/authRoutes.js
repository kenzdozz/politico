import express from 'express';
import validateInputs from '../middlewares/validateInputs';
import { registerRules, loginRules, resetPasswordRules } from '../middlewares/validationRules';
import AuthController from '../controllers/Auth';
import multerUpload from '../middlewares/multerUpload';
import trimInput from '../middlewares/trimInput';

const router = express.Router();

router.route('/signup').post(multerUpload('passport'), trimInput, validateInputs(registerRules), AuthController.signup);
router.route('/login').post(trimInput, validateInputs(loginRules), AuthController.login);
router.route('/reset').post(trimInput, validateInputs(resetPasswordRules), AuthController.requestResetPassword);
router.route('/reset').patch(trimInput, AuthController.resetPassword);

export default router;
