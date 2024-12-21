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
import { upload } from '../middlewares/multer.js';

const router = express.Router();

router.use(authenticate);


router.get("/", authenticate, upload.single('photo'), ctrlWrapper(getAllContacts));

router.get("/:contactId", authenticate, upload.single('photo'), isValidId, ctrlWrapper(getContactById));

router.post("/register", authenticate, validateBody(createContactSchema), ctrlWrapper(createContactController));

router.patch("/:contactId", authenticate, isValidId, upload.single('photo'), validateBody(updateContactSchema), ctrlWrapper(updateContactController));

router.delete("/:contactId", authenticate, isValidId, ctrlWrapper(deleteContactController));

export default router;
