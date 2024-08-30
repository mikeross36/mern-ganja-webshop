import express from "express";
import validateSchema from "../middlewares/validateSchema";
import {
  forgotPasswordSchema,
  loginUserSchema,
  registerUserSchema,
  resetPasswordSchema,
  updatePasswordSchema,
  verifyUserSchema,
} from "../schemas/authSchema";
import {
  forgotPasswordHandler,
  loginUserHandler,
  logoutUserHandler,
  refreshAccessTokenHandler,
  registerUserHandler,
  resetPasswordHandler,
  updatePasswordHandler,
  verifyUserHandler,
} from "../controllers/authController";
import { tokenProtect } from "../middlewares/tokenProtect";
import { requireUser } from "../middlewares/requireUser";

const router = express.Router();

router.post(
  "/register",
  validateSchema(registerUserSchema),
  registerUserHandler
);

router.post(
  "/verify/:userId/:verificationCode",
  validateSchema(verifyUserSchema),
  verifyUserHandler
);

router.post("/login", validateSchema(loginUserSchema), loginUserHandler);
router.get("/refresh", refreshAccessTokenHandler);

router.post(
  "/forgot-password",
  validateSchema(forgotPasswordSchema),
  forgotPasswordHandler
);
router.patch(
  "/reset-password/:resetToken",
  validateSchema(resetPasswordSchema),
  resetPasswordHandler
);

router.use(tokenProtect, requireUser);

router.post("/logout", logoutUserHandler);
router.patch(
  "/update-password",
  validateSchema(updatePasswordSchema),
  updatePasswordHandler
);

export default router;
