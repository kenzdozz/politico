import express from 'express';
import validateInputs from '../middlewares/validateInputs';
import { registerRules, loginRules, resetPasswordRules } from '../middlewares/validationRules';
import AuthController from '../controllers/Auth';

const router = express.Router();

router.route('/signup').post(validateInputs(registerRules), AuthController.signup);
router.route('/login').post(validateInputs(loginRules), AuthController.login);
router.route('/reset').post(validateInputs(resetPasswordRules), AuthController.requestResetPassword);
router.route('/reset').patch(AuthController.resetPassword);

export default router;
