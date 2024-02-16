const Contacts = require("../models/contactsModel");

async function listContacts() {
  return Contacts.find();
}

async function getContactById(contactId) {
  const contact = await Contacts.findById(contactId);

  if (contact) return contact;

  return null;
}

async function removeContact(contactId) {
  const removedContact = await Contacts.findByIdAndDelete(contactId);

  return removedContact;
}

async function addContact(newContactBody) {
  const newContact = await Contacts.create(newContactBody);

  return newContact;
}

async function updateContact(contactId, newBody) {
  const updatedContact = await Contacts.findByIdAndUpdate(contactId, newBody, {
    new: true,
  });
  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
