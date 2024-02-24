const path = require("path");
const multer = require("multer");
const { v4 } = require("uuid");
const { HttpError } = require("../helpers");

const { validateBody, validateId } = require("../utils");

const multerStorage = multer.diskStorage({
  destination: (req, file, cbk) => {
    cbk(null, path.join("tmp"));
  },
  filename: (req, file, cbk) => {
    const extension = file.mimetype.split("/")[1]; // 'image/png'

    cbk(null, `${req.user.id}-${v4()}.${extension}`);
  },
});

const multerFilter = (req, file, cbk) => {
  if (file.mimetype.startsWith("image/")) {
    cbk(null, true);
  } else {
    cbk(HttpError(400, "No image recieved"), false);
  }
};

const uploadAvatar = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
}).single("avatar");

module.exports = { validateBody, validateId, uploadAvatar };
