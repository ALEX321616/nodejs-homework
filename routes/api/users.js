const express = require("express");

const {
  validateSchema,
  ctrlWrapper,
  auth,
  upload,
} = require("../../middlewares");

const {
  registerUserSchema,
  loginUserSchema,
  verifyUserSchema,
} = require("../../models/users");
const router = express.Router();
const { users: ctrl } = require("../../controllers");

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.post(
  "/signup",
  validateSchema(registerUserSchema),
  ctrlWrapper(ctrl.register)
);
router.post(
  "/verify",
  validateSchema(verifyUserSchema),
  ctrlWrapper(ctrl.repeatVerifyEmail)
);
router.post("/login", validateSchema(loginUserSchema), ctrlWrapper(ctrl.login));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
