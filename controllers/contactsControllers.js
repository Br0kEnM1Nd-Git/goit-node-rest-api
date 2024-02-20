const { HttpError } = require("../helpers");
const { contactsServices: contactsService } = require("../services");
const { phoneNumberModifier } = require("../utils");
const { catchAsync } = require("../utils");

exports.getAllContacts = catchAsync(async (req, res) => {
  const data = await contactsService.listContacts(req.user.id, req.query);

  res.status(200).json(data);
});

exports.getOneContact = catchAsync(async (req, res) => {
  const contact = await contactsService.getContactById(req.params.id);

  if (contact) return res.status(200).json(contact);

  throw HttpError(404, "Not found");
});

exports.deleteContact = catchAsync(async (req, res) => {
  const deletedContact = await contactsService.removeContact(req.params.id);

  if (!deletedContact) return res.status(404).send({ message: "Not found" });

  res.status(200).send(deletedContact);
});

exports.createContact = catchAsync(async (req, res) => {
  const newContactBody = {
    ...req.body,
    phone: phoneNumberModifier(req.body.phone),
    owner: req.user.id,
  };

  const newContact = await contactsService.addContact(newContactBody);

  res.status(201).json(newContact);
});

exports.updateContact = catchAsync(async (req, res) => {
  const updatedContact = await contactsService.updateContact(
    req.params.id,
    req.body
  );

  if (!updatedContact) return res.status(404).json({ message: "Not found" });

  res.status(200).json(updatedContact);
});

exports.updateStatusContact = catchAsync(async (req, res) => {
  const updatedContact = await contactsService.updateStatusContact(
    req.params.id,
    req.body
  );

  if (!updatedContact) return HttpError(404, "Not found");

  res.status(200).json(updatedContact);
});
