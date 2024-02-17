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
const { validateBody } = require("../middlewares");
const { validateId } = require("../middlewares");

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
