const express = require("express");
const {
  usersControllers: {
    createUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    changeUserPlan,
    changeUserAvatar,
  },
} = require("../controllers");

const {
  usersSchemas: { authUserSchema, changePlanUserSchema },
} = require("../schemas");

const { usersMiddleware, authMiddleware } = require("../middlewares");

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

usersRouter.use(authMiddleware.protect);

usersRouter.post("/logout", logoutUser);
usersRouter.get("/current", getCurrentUser);
usersRouter.patch(
  "/",
  usersMiddleware.validateBody(changePlanUserSchema),
  changeUserPlan
);
usersRouter.patch("/avatars", usersMiddleware.uploadAvatar, changeUserAvatar);

module.exports = usersRouter;
