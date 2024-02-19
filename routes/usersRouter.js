const express = require("express");
const {
  usersControllers: { createUser, loginUser },
} = require("../controllers");

const {
  usersSchemas: { authUserSchema },
} = require("../schemas");

const { usersMiddleware } = require("../middlewares");

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  usersMiddleware.validateBody(authUserSchema),
  createUser
);

usersRouter.post(
  "/login",
  usersMiddleware.validateBody(authUserSchema),
  loginUser
);

// usersRouter
//   .route("/")
//   .get(getAllContacts)
//   .post(contactsMiddleware.validateBody(createContactSchema), createContact);

// usersRouter.use("/:id", contactsMiddleware.validateId);
// usersRouter
//   .route("/:id")
//   .get(getOneContact)
//   .delete(deleteContact)
//   .put(contactsMiddleware.validateBody(updateContactSchema), updateContact);

// usersRouter
//   .route("/:id/favorite")
//   .patch(
//     contactsMiddleware.validateBody(updateStatusContactSchema),
//     updateStatusContact
//   );

module.exports = usersRouter;
