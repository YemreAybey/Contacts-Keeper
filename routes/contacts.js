import express from "express";
import {
  getContacts,
  addContact,
  updateContact,
  deleteContact
} from "../controllers/contacts";

const router = express.Router();

router.get("/", getContacts);

router.post("/", addContact);

router.put("/:id", updateContact);

router.delete("/:id", deleteContact);

export default router;
