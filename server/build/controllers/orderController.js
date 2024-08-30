"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderHandler = createOrderHandler;
exports.getOrderHandler = getOrderHandler;
exports.payOrderHandler = payOrderHandler;
exports.getUserOrdersHandler = getUserOrdersHandler;
exports.createStripePaymentIntentHandler = createStripePaymentIntentHandler;
exports.getStripePublishableKey = getStripePublishableKey;
exports.deliverOrderHandler = deliverOrderHandler;
const orderService_1 = require("../services/orderService");
const models_1 = require("../models");
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("config"));
function createOrderHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.body.orderItems.length === 0) {
                return res.status(400).json({ message: "Shopping cart is empty" });
            }
            const order = yield (0, orderService_1.createOrder)({
                orderItems: req.body.orderItems,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                user: req.user._id,
            });
            if (!order) {
                return res.status(400).json({ message: "Failed to create order." });
            }
            return res.status(201).json({
                status: "success",
                message: "Order successfully created",
                order,
            });
        }
        catch (err) {
            if (err instanceof Error) {
                return next(err);
            }
            return next(new Error("An unknown error occurred"));
        }
    });
}
function getOrderHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.params.id || typeof req.params.id !== "string") {
                return res
                    .status(400)
                    .json({ status: "error", message: "Invalid order id" });
            }
            const order = yield (0, orderService_1.findOrderById)(req.params.id);
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            return res.status(200).json(order);
        }
        catch (err) {
            if (err instanceof Error) {
                return next(err);
            }
            return next(new Error("An unknown error occurred"));
        }
    });
}
function payOrderHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.params.id || typeof req.params.id !== "string") {
                return res
                    .status(400)
                    .json({ status: "error", message: "Invalid order id" });
            }
            const order = yield (0, orderService_1.findOrderById)(req.params.id);
            if (!order) {
                return res.status(404).json({ message: "Unable to pay order" });
            }
            else {
                order.isPaid = true;
                order.paidAt = new Date(Date.now());
                order.paymentResult = {
                    paymentId: req.body.id,
                    status: req.body.status,
                    update_time: req.body.update_time,
                    email_address: req.body.email_address,
                };
                const paidOrder = yield order.save();
                return res
                    .status(200)
                    .json({ message: "Order paid successfully", order: paidOrder });
            }
        }
        catch (err) {
            if (err instanceof Error) {
                return next(err);
            }
            return next(new Error("An unknown error occurred"));
        }
    });
}
function getUserOrdersHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield models_1.OrderModel.find({ user: req.user._id });
            if (!orders) {
                return res.status(404).json({ message: "Orders not found" });
            }
            return res.status(200).json({ status: "success", data: { orders } });
        }
        catch (err) {
            if (err instanceof Error) {
                return next(err);
            }
            return next(new Error("An unknown error occurred"));
        }
    });
}
// export async function getPaypalClientId(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const clientId = config.get("payPalClientId");
//     if (!clientId) {
//       return res.status(404).json({ message: "PayPal client ID not found" });
//     }
//     return res.status(200).json({ clientId });
//   } catch (err) {
//     if (err instanceof Error) {
//       return next(err);
//     }
//     return next(new Error("An unknown error occurred"));
//   }
// }
function createStripePaymentIntentHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.params.id || typeof req.params.id !== "string") {
                return res
                    .status(400)
                    .json({ status: "error", message: "Invalid order id" });
            }
            const order = yield (0, orderService_1.findOrderById)(req.params.id);
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            const stripe = new stripe_1.default(config_1.default.get("stripeSecretKey"));
            const paymentIntent = yield stripe.paymentIntents.create({
                amount: order.totalPrice * 100,
                currency: "EUR",
                payment_method_types: ["card"],
            });
            if (!paymentIntent) {
                return res.status(500).json({ message: "Server error" });
            }
            return res.status(200).json({ clientSecret: paymentIntent.client_secret });
        }
        catch (err) {
            if (err instanceof Error) {
                return next(err);
            }
            return next(new Error("An unknown error occurred"));
        }
    });
}
function getStripePublishableKey(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pubKey = config_1.default.get("stripePublishableKey");
            if (!pubKey) {
                return res
                    .status(404)
                    .json({ message: "Stripe publishable key not found" });
            }
            return res.status(200).json({ key: pubKey });
        }
        catch (err) {
            if (err instanceof Error) {
                return next(err);
            }
            return next(new Error("An unknown error occurred"));
        }
    });
}
function deliverOrderHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.params.id || typeof req.params.id !== "string") {
                return res
                    .status(400)
                    .json({ status: "error", message: "Invalid order id" });
            }
            const order = yield (0, orderService_1.findOrderById)(req.params.id);
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            else {
                order.isDelivered = true;
                order.deliveredAt = new Date(Date.now());
                const deliveredOrder = yield order.save();
                return res.status(200).json({
                    status: "success",
                    message: "Order delivered",
                    order: deliveredOrder,
                });
            }
        }
        catch (err) {
            if (err instanceof Error) {
                return next(err);
            }
            return next(new Error("An unknown error occurred"));
        }
    });
}
