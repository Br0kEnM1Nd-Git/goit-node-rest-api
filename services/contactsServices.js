const { contactsModel: Contacts } = require("../models");

async function listContacts(userId, query) {
  const findContacts = Contacts.find({
    owner: userId,
    favorite: query.favorite === "true" ? true : false,
  });

  const contactsLimit = +query.limit ?? 5;
  const contactsSkip = contactsLimit * (+query.page - 1);

  findContacts.limit(contactsLimit);
  findContacts.skip(contactsSkip);

  const foundContacts = await findContacts;
  const total = await Contacts.countDocuments({ owner: userId });

  return { total, contacts: foundContacts };
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

async function updateStatusContact(contactId, body) {
  const updatedContact = await Contacts.findByIdAndUpdate(contactId, body, {
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
  updateStatusContact,
};
