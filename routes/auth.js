import express from 'express';
import { getUser, loginUser } from '../controllers/auth.js';
import { isAuthorized } from '../middleware/auth.js';
import validator from 'express-validator';

const { check } = validator;

const router = express.Router();

router.get('/', isAuthorized, getUser);

router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password required').exists(),
  ],
  loginUser
);

export default router;
