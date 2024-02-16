const express = require("express");
const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} = require("../controllers/contactsControllers.js");

const {
  createContactSchema,
  updateContactSchema,
} = require("../schemas/contactsSchemas.js");
const validateBody = require("../middlewares/validateBody.js");
const validateId = require("../middlewares/validateId.js");

const contactsRouter = express.Router();

contactsRouter
  .route("/")
  .get(getAllContacts)
  .post(validateBody(createContactSchema), createContact);

contactsRouter.use("/:id", validateId);
contactsRouter
  .route("/:id")
  .get(getOneContact)
  .delete(deleteContact)
  .put(validateBody(updateContactSchema), updateContact);

module.exports = contactsRouter;
