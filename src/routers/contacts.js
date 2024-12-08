import express from "express";
import {
  getAllContacts,
  getContactById,
  createContactController,
  updateContactController,
  deleteContactController,
} from "../controllers/contacts.js";

import {
  createContactSchema,
  updateContactSchema,
} from "../validation/contacts.js";

import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from "../utils/ctrlWrapper.js";


const router = express.Router();

router.use(authenticate);


router.get("/", ctrlWrapper(getAllContacts));

router.get("/:contactId", isValidId, ctrlWrapper(getContactById));

router.post("/register", validateBody(createContactSchema), ctrlWrapper(createContactController));

router.patch("/:contactId", isValidId, validateBody(updateContactSchema), ctrlWrapper(updateContactController));

router.delete("/:contactId", isValidId, ctrlWrapper(deleteContactController));

export default router;
