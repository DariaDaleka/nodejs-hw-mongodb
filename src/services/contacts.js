import { Contact } from "../models/contactModel.js";

export const fetchAllContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch {
    throw new Error("Failed to fetch contacts from the database.");
  }
};

export const fetchContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      throw new Error("Contact not found.");
    }
    return contact;
  } catch {
    throw new Error("Failed to fetch contact by ID.");
  }
};

export const createContact = async (contactData) => {
  try {
    const newContact = new Contact(contactData);
    await newContact.save();
    return newContact;
  } catch {
    throw new Error("Failed to create a new contact.");
  }
};

export const updateContact = async (contactId, updateData) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, updateData, { new: true });
    if (!updatedContact) {
      throw new Error("Contact not found.");
    }
    return updatedContact;
  } catch {
    throw new Error("Failed to update contact.");
  }
};

export const deleteContact = async (contactId) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    if (!deletedContact) {
      throw new Error("Contact not found.");
    }
    return deletedContact;
  } catch {
    throw new Error("Failed to delete contact.");
  }
};
