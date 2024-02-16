const contactsService = require("../services/contactsServices.js");
const {
  createContactSchema,
  updateContactSchema,
} = require("../schemas/contactsSchemas.js");

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
  const { value: body, error } = createContactSchema.validate(req.body);

  if (error) return res.status(400).json({ message: error.message });

  const newContact = await contactsService.addContact(body);

  res.status(201).json(newContact);
};

exports.updateContact = async (req, res) => {
  const { value: body, error } = updateContactSchema.validate(req.body);

  if (error) return res.status(400).json({ message: error.message });

  const updatedContact = await contactsService.updateContact(
    req.params.id,
    body
  );

  if (!updatedContact) return res.status(404).json({ message: "Not found" });

  res.status(200).json(updatedContact);
};
