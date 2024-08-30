"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const tokenProtect_1 = require("../middlewares/tokenProtect");
const requireUser_1 = require("../middlewares/requireUser");
const router = express_1.default.Router();
router.use(tokenProtect_1.tokenProtect, requireUser_1.requireUser);
router.post("/", orderController_1.createOrderHandler);
// if place router /:id above route user/orders (/api/v1/orders/user-orders) router will
// consider /user-orders as an id, and it is not type of ObjectId;
router.put("/:id/pay-order", orderController_1.payOrderHandler);
router.get("/user-orders", orderController_1.getUserOrdersHandler);
router.get("/:id", orderController_1.getOrderHandler);
// router.post("/:id/stripe-payment-iintent", createStripePaymentIntentHandler);
router.put("/:id/deliver-order", orderController_1.deliverOrderHandler);
router.get("/stripe", orderController_1.getStripePublishableKey);
exports.default = router;
