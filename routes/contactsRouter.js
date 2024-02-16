const express = require("express");
const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} = require("../controllers/contactsControllers.js");

const contactsRouter = express.Router();

contactsRouter.route("/").get(getAllContacts).post(createContact);

contactsRouter
  .route("/:id")
  .get(getOneContact)
  .delete(deleteContact)
  .put(updateContact);

module.exports = contactsRouter;
