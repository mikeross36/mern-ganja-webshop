import { modelOptions, prop, Ref, Severity } from "@typegoose/typegoose";
import { Ganja } from "./ganjaModel";
import { User } from "./userModel";

export class OrderItem {
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  quantity: number;

  @prop({ required: true })
  coverImage: string;

  @prop({ required: true })
  price: number;

  @prop({ required: true, ref: () => Ganja, type: () => Ganja })
  ganja: Ref<Ganja>;
}

export class ShippingAddress {
  @prop()
  fullName?: string;

  @prop()
  address?: string;

  @prop()
  city?: string;

  @prop()
  postalCode?: string;

  @prop()
  country?: string;

  @prop()
  lat?: number;

  @prop()
  lng?: number;
}

class PaymentResult {
  @prop()
  paymentId: string;

  @prop()
  status: string;

  @prop()
  update_time: string;

  @prop()
  email_address: string;
}

@modelOptions({
  schemaOptions: { timestamps: true },
  options: { allowMixed: Severity.ALLOW },
})
export class Order {
  _id: string;

  @prop()
  orderItems: OrderItem[];

  @prop()
  shippingAddress: ShippingAddress;

  @prop({ required: true })
  paymentMethod: string;

  @prop()
  paymentResult?: PaymentResult;

  @prop({ required: true, default: 0 })
  itemsPrice: number;

  @prop({ required: true, default: 0 })
  taxPrice: number;

  @prop({ require: true, default: 0 })
  shippingPrice: number;

  @prop({ required: true, default: 0 })
  totalPrice: number;

  @prop({ required: true, default: false })
  isPaid: boolean;

  @prop({ required: true, default: false })
  isDelivered: boolean;

  @prop()
  paidAt: Date;

  @prop()
  deliveredAt: Date;

  @prop({ required: true, ref: () => User, type: () => User })
  user: Ref<User>;
}

export type CreateOrderInput = {
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  user: User["_id"];
};
