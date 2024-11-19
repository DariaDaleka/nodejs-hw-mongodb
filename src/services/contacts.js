import { Contact } from "../models/contactModel.js";


export const fetchAllContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch  {
    throw new Error("Failed to fetch contacts from the database.");
  }
};

export const fetchContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch  {
    throw new Error("Failed to fetch contact by ID.");
  }
};
