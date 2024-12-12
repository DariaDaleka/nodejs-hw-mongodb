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
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/constants.js';


const router = express.Router();

router.use(authenticate);


router.get("/", authenticate,
  checkRoles(ROLES.ADMIN), ctrlWrapper(getAllContacts));

router.get("/:contactId", authenticate,
  checkRoles(ROLES.ADMIN, ROLES.USER), isValidId, ctrlWrapper(getContactById));

router.post("/register", authenticate,
  checkRoles(ROLES.ADMIN), validateBody(createContactSchema), ctrlWrapper(createContactController));

router.patch("/:contactId", authenticate,
  checkRoles(ROLES.ADMIN, ROLES.USER), isValidId, validateBody(updateContactSchema), ctrlWrapper(updateContactController));

router.delete("/:contactId", authenticate,
  checkRoles(ROLES.ADMIN), isValidId, ctrlWrapper(deleteContactController));

export default router;
