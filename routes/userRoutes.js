import express from 'express';
import UserController from '../controllers/User';
import { authenticated } from '../middlewares/authentication';

const router = express.Router();

router.route('/').get(UserController.getUsers);
router.route('/:id').get(authenticated, UserController.getUser);
router.route('/:id').patch(UserController.editUser);
router.route('/:id').delete(UserController.deleteUser);

export default router;
