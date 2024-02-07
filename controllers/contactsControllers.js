const contactsService = require("../services/contactsServices.js");

exports.getAllContacts = async (req, res) => {
  const contacts = await contactsService.listContacts();
  res.status(200).json(contacts);
};

exports.getOneContact = async (req, res) => {
  const contact = await contactsService.getContactById();

  if (contact) return res.status(200).json(contact);
};

exports.deleteContact = async (req, res) => {};

exports.createContact = async (req, res) => {};

exports.updateContact = async (req, res) => {};
