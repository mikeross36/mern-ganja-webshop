import express from "express";
import {
  createOrderHandler,
  deliverOrderHandler,
  getOrderHandler,
  getUserOrdersHandler,
  payOrderHandler,
  // createStripePaymentIntentHandler,
  getStripePublishableKey,
} from "../controllers/orderController";
import { tokenProtect } from "../middlewares/tokenProtect";
import { requireUser } from "../middlewares/requireUser";

const router = express.Router();

router.use(tokenProtect, requireUser);

router.post("/", createOrderHandler);
// if place router /:id above route user/orders (/api/v1/orders/user-orders) router will
// consider /user-orders as an id, and it is not type of ObjectId;
router.put("/:id/pay-order", payOrderHandler);
router.get("/user-orders", getUserOrdersHandler);
router.get("/:id", getOrderHandler);
// router.post("/:id/stripe-payment-iintent", createStripePaymentIntentHandler);
router.put("/:id/deliver-order", deliverOrderHandler);
router.get("/stripe", getStripePublishableKey);

export default router;
