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
  querySchemas: { contactsQuerySchema },
} = require("../schemas");
const { contactsMiddleware, authMiddleware } = require("../middlewares");

const contactsRouter = express.Router();

contactsRouter.use(authMiddleware.protect);

contactsRouter
  .route("/")
  .get(contactsMiddleware.validateQuery(contactsQuerySchema), getAllContacts)
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
