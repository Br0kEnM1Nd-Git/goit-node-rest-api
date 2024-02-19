const express = require("express");
const {
  contactsControllers: {
    getAllContacts,
    getOneContact,
    deleteContact,
    createContact,
    updateContact,
    updateStatusContact,
  },
} = require("../controllers");

const {
  contactsSchemas: {
    createContactSchema,
    updateContactSchema,
    updateStatusContactSchema,
  },
} = require("../schemas");
const { contactsMiddleware } = require("../middlewares");

const contactsRouter = express.Router();

contactsRouter
  .route("/")
  .get(getAllContacts)
  .post(contactsMiddleware.validateBody(createContactSchema), createContact);

contactsRouter.use("/:id", contactsMiddleware.validateId);
contactsRouter
  .route("/:id")
  .get(getOneContact)
  .delete(deleteContact)
  .put(contactsMiddleware.validateBody(updateContactSchema), updateContact);

contactsRouter
  .route("/:id/favorite")
  .patch(
    contactsMiddleware.validateBody(updateStatusContactSchema),
    updateStatusContact
  );

module.exports = contactsRouter;
