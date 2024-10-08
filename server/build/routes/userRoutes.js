"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tokenProtect_1 = require("../middlewares/tokenProtect");
const requireUser_1 = require("../middlewares/requireUser");
const restrictTo_1 = require("../middlewares/restrictTo");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.use(tokenProtect_1.tokenProtect, requireUser_1.requireUser);
router.get("/", (0, restrictTo_1.restrictTo)("admin"), userController_1.getAllUsersHandler);
router.get("/loggedin-info", userController_1.getLoggedInUserInfo);
router.delete("/delete-me", userController_1.deleteMeHandler);
router.get("/user-profile", userController_1.getUserProfileHandler, userController_1.getUserHandler);
router.put("/update-user-account", userController_1.updateUserAccountHandler);
router.get("/:userId", (0, restrictTo_1.restrictTo)("admin"), userController_1.getUserHandler);
router.patch("/:userId", (0, restrictTo_1.restrictTo)("admin", "user"), userController_1.updateUserHandler);
router.delete("/:userId", (0, restrictTo_1.restrictTo)("admin"), userController_1.deleteUserHandler);
exports.default = router;
