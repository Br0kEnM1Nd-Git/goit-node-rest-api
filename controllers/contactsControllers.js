const contactsService = require("../services/contactsServices.js");
const phoneNumberModifier = require("../utils/phoneNumberModifier.js");

exports.getAllContacts = async (req, res) => {
  const contacts = await contactsService.listContacts();
  res.status(200).json(contacts);
};

exports.getOneContact = async (req, res) => {
  const contact = await contactsService.getContactById(req.params.id);

  if (contact) return res.status(200).json(contact);

  res.status(404).send({ message: "Not found" });
};

exports.deleteContact = async (req, res) => {
  const deletedContact = await contactsService.removeContact(req.params.id);

  if (!deletedContact) return res.status(404).send({ message: "Not found" });

  res.status(200).send(deletedContact);
};

exports.createContact = async (req, res) => {
  const newContactBody = {
    ...req.body,
    phone: phoneNumberModifier(req.body.phone),
  };

  const newContact = await contactsService.addContact(newContactBody);

  res.status(201).json(newContact);
};

exports.updateContact = async (req, res) => {
  const updatedContact = await contactsService.updateContact(
    req.params.id,
    req.body
  );

  if (!updatedContact) return res.status(404).json({ message: "Not found" });

  res.status(200).json(updatedContact);
};
