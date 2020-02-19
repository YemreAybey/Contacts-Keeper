import { validationResult } from 'express-validator/';
import Contact from '../models/Contact';

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    if (!contacts) {
      return res.json({ msg: 'You dont have any contacts' });
    }
    res.json({ contacts });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

export const addContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, phone, type } = req.body;
  const newPhone = phone ? phone : 'Is Not Provided';
  try {
    const contact = new Contact({
      name,
      email,
      phone: newPhone,
      type,
      user: req.user.id,
    });
    await contact.save();
    res.json({ contact });
  } catch (err) {
    console.log(err);
    res.status(500).send('server error');
  }
};

export const updateContact = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, type } = req.body;
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(400).json({ msg: 'There is no such contact' });
    }
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'You are not authorized to do this' });
    }
    contact.name = name ? name : contact.name;
    contact.email = email ? email : contact.email;
    contact.phone = phone ? phone : contact.phone;
    contact.type = type ? type : contact.type;
    await contact.save();
    res.json({ contact });
  } catch (err) {
    console.log(err);
    res.status(500).send('server error');
  }
};
export const deleteContact = async (req, res) => {
  const id = req.params.id;
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(400).json({ msg: 'There is no such contact' });
    }
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'You are not authorized to do this' });
    }
    await Contact.findByIdAndRemove(id);
    res.json({ msg: 'Contact Removed' });
  } catch (err) {
    console.log(err);
    res.status(500).send('server error');
  }
};
