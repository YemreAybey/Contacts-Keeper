import express from 'express';
import {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
} from '../controllers/contacts';
import { check } from 'express-validator';

import { isAuthorized } from '../middleware/auth';

const router = express.Router();

router.get('/', isAuthorized, getContacts);

router.post('/', isAuthorized, addContact);

router.put(
  '/:id',
  [
    isAuthorized,
    [
      check('name', 'Please add name')
        .not()
        .isEmpty(),
      check('email', 'Please enter a valid email').isEmail(),
    ],
  ],
  updateContact
);

router.delete('/:id', isAuthorized, deleteContact);

export default router;
