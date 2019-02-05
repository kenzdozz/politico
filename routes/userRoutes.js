import express from 'express';
import UserController from '../controllers/User';
import { authenticated, isAdmin } from '../middlewares/authentication';

const router = express.Router();

router.route('/').get(authenticated, UserController.getUsers);
router.route('/:id').get(authenticated, UserController.getUser);
router.route('/:id').patch(authenticated, UserController.editUser);
router.route('/:id').delete(authenticated, isAdmin, UserController.deleteUser);

export default router;
