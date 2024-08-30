"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateSchema_1 = __importDefault(require("../middlewares/validateSchema"));
const ganjaSchema_1 = require("../schemas/ganjaSchema");
const tokenProtect_1 = require("../middlewares/tokenProtect");
const requireUser_1 = require("../middlewares/requireUser");
const restrictTo_1 = require("../middlewares/restrictTo");
const reviewRoutes_1 = __importDefault(require("./reviewRoutes"));
const ganjaController_1 = require("../controllers/ganjaController");
const router = express_1.default.Router({ mergeParams: true });
router.use("/:ganjaId/reviews", reviewRoutes_1.default);
router
    .route("/")
    .post([
    tokenProtect_1.tokenProtect,
    requireUser_1.requireUser,
    (0, restrictTo_1.restrictTo)("admin"),
    (0, validateSchema_1.default)(ganjaSchema_1.createGanjaSchema),
    ganjaController_1.createGanjaHandler,
])
    .get(ganjaController_1.getAllGanjasHandler);
router.route("/:ganjaId").get((0, validateSchema_1.default)(ganjaSchema_1.getGanjaSchema), ganjaController_1.getGanjaHandler);
exports.default = router;
