import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import createHttpError from "http-errors";
import {
  createContact,
  updateContact,
  deleteContact,
  fetchAllContacts,
  fetchContactById,
} from "../services/contacts.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const userId = req.user._id;

    const contacts = await fetchAllContacts({
      userId,
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
    });

    res.json({
      status: 200,
      message: 'Contacts fetched successfully!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const userId = req.user._id;

    const contact = await fetchContactById(contactId, userId);

    if (!contact) {
      throw createHttpError(404, "Contact not found or access denied");
    }

    res.json({
      status: 200,
      message: `Contact with ID ${contactId} fetched successfully`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const createContactController = async (req, res, next) => {
  try {
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);
    console.log("Authenticated user ID:", req.user._id);

    const userId = req.user._id;

    let photoUrl = null;
    if (req.file) {
      photoUrl = req.file.path;
    }

    const newContact = await createContact({ ...req.body, photo: photoUrl, userId });

    res.status(201).json({
      status: 201,
      message: "Contact created successfully",
      data: newContact,
    });
  } catch (error) {
    console.error("Controller error:", error.message, error.stack);

    next(error);
  }
};

export const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const updateData = req.body;
  const photo = req.file;

  let photoUrl;

  try {
    if (photo) {
      photoUrl = await saveFileToCloudinary(photo.path);

    }

    const updatedContact = await updateContact(contactId, {
      ...updateData,
      photo: photoUrl,
    });

    if (!updatedContact) {
      return next(createHttpError(404, "Contact not found or access denied"));
    }

    res.status(200).json({
      status: 200,
      message: "Contact updated successfully",
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const userId = req.user._id;

    const deletedContact = await deleteContact(contactId, userId);

    if (!deletedContact) {
      throw createHttpError(404, "Contact not found or access denied");
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};


