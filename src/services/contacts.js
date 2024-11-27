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
  return await Contact.findById(contactId);
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
  return await Contact.findByIdAndUpdate(contactId, updateData, { new: true });
};

export const deleteContact = async (contactId) => {
  return await Contact.findByIdAndDelete(contactId);
};
