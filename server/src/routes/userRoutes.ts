import express from "express";
import { tokenProtect } from "../middlewares/tokenProtect";
import { requireUser } from "../middlewares/requireUser";
import { restrictTo } from "../middlewares/restrictTo";
import {
  deleteMeHandler,
  deleteUserHandler,
  getAllUsersHandler,
  getLoggedInUserInfo,
  getUserHandler,
  getUserProfileHandler,
  updateUserAccountHandler,
  updateUserHandler,
} from "../controllers/userController";

const router = express.Router();

router.use(tokenProtect, requireUser);

router.get("/", restrictTo("admin"), getAllUsersHandler);
router.get("/loggedin-info", getLoggedInUserInfo);
router.delete("/delete-me", deleteMeHandler);
router.get("/user-profile", getUserProfileHandler, getUserHandler);
router.put("/update-user-account", updateUserAccountHandler);

router.get("/:userId", restrictTo("admin"), getUserHandler);
router.patch("/:userId", restrictTo("admin", "user"), updateUserHandler);
router.delete("/:userId", restrictTo("admin"), deleteUserHandler);

export default router;
