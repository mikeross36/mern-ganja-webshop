import { Request, Response, NextFunction } from "express";
import { createOrder, findOrderById } from "../services/orderService";
import { OrderModel } from "../models";
import { CreateOrderInput } from "../models/orderModel";
import Stripe from "stripe";
import config from "config";

export async function createOrderHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.body.orderItems.length === 0) {
      return res.status(400).json({ message: "Shopping cart is empty" });
    }
    const order = await createOrder({
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    } as unknown as CreateOrderInput);
    if (!order) {
      return res.status(400).json({ message: "Failed to create order." });
    }
    return res.status(201).json({
      status: "success",
      message: "Order successfully created",
      order,
    });
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}

export async function getOrderHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.id || typeof req.params.id !== "string") {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid order id" });
    }
    const order = await findOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json(order);
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}

export async function payOrderHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.id || typeof req.params.id !== "string") {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid order id" });
    }
    const order = await findOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Unable to pay order" });
    } else {
      order.isPaid = true;
      order.paidAt = new Date(Date.now());
      order.paymentResult = {
        paymentId: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const paidOrder = await order.save();
      return res
        .status(200)
        .json({ message: "Order paid successfully", order: paidOrder });
    }
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}

export async function getUserOrdersHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const orders = await OrderModel.find({ user: req.user._id });
    if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    }
    return res.status(200).json({ status: "success", data: { orders } });
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
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

export async function createStripePaymentIntentHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.id || typeof req.params.id !== "string") {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid order id" });
    }
    const order = await findOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const stripe = new Stripe(config.get("stripeSecretKey"));

    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.totalPrice * 100,
      currency: "EUR",
      payment_method_types: ["card"],
    });
    if (!paymentIntent) {
      return res.status(500).json({ message: "Server error" });
    }
    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}

export async function getStripePublishableKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const pubKey = config.get("stripePublishableKey");
    if (!pubKey) {
      return res
        .status(404)
        .json({ message: "Stripe publishable key not found" });
    }
    return res.status(200).json({ key: pubKey });
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}

export async function deliverOrderHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.id || typeof req.params.id !== "string") {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid order id" });
    }
    const order = await findOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    } else {
      order.isDelivered = true;
      order.deliveredAt = new Date(Date.now());

      const deliveredOrder = await order.save();
      return res.status(200).json({
        status: "success",
        message: "Order delivered",
        order: deliveredOrder,
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}
