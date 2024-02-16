const express = require("express");
const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} = require("../controllers/contactsControllers.js");

const {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
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

contactsRouter
  .route("/:id/favorite")
  .patch(validateBody(updateStatusContactSchema), updateStatusContact);

module.exports = contactsRouter;
