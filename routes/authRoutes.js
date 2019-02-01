import express from 'express';
import validateInputs from '../middlewares/validateInputs';
import UserController from '../controllers/User';

const router = express.Router();

const rules = [
  {
    name: 'firstname',
    rule: 'required',
    message: 'First name is required.',
  },
  {
    name: 'lastname',
    rule: 'required',
    message: 'Last name is required.',
  },
  {
    name: 'email',
    rule: 'required',
    message: 'Email address is required.',
  },
  {
    name: 'email',
    rule: 'email',
    message: 'A valid email address is required.',
  },
  {
    name: 'phoneNumber',
    rule: 'required',
    message: 'Phone number is required.',
  },
  {
    name: 'phoneNumber',
    rule: 'number',
    message: 'Phone number must be a number.',
  },
  {
    name: 'password',
    rule: 'required',
    message: 'Password is required.',
  },
  {
    name: 'gender',
    rule: 'required',
    message: 'Gender is required.',
  },
];

router.route('/signup').post(validateInputs(rules), UserController.createUser);
router.route('/').get(UserController.getParties);
router.route('/:id').get(UserController.getUser);
router.route('/:id').patch(UserController.editUser);
router.route('/:id').delete(UserController.deleteUser);

export default router;
