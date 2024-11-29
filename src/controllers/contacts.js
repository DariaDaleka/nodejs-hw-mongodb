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
    const contacts = await fetchAllContacts();
    res.status(200).json({
      status: 200,
      message: "Successfully fetched all contacts!",
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await fetchContactById(contactId);

    if (!contact) {

      throw createHttpError(404, "Contact not found");
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const createContactController = async (req, res, next) => {
  try {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;


    if (!name || !phoneNumber || !contactType) {
      throw createHttpError(400, "Missing required fields: name, phoneNumber, contactType.");
    }

    const newContact = await createContact({ name, phoneNumber, email, isFavourite, contactType });

    if (!newContact) {
      throw createHttpError(404, "Contact not found");
    }

    res.status(201).json({
      status: 201,
      message: "Successfully created a contact!",
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updateData = req.body;

    const updatedContact = await updateContact(contactId, updateData);

    if (!updatedContact) {
      throw createHttpError(404, "Contact not found");
    }

    res.status(200).json({
      status: 200,
      message: "Successfully updated contact!",
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const deletedContact = await deleteContact(contactId);

    if (!deletedContact) {
      throw createHttpError(404, "Contact not found");
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
