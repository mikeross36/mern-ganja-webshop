import { getModelForClass } from "@typegoose/typegoose";
import { User } from "./userModel";
import { Ganja } from "./ganjaModel";
import { Category } from "./categoryModel";
import { Order } from "./orderModel";
import { Review } from "./reviewModel";

export const UserModel = getModelForClass(User);
export const GanjaModel = getModelForClass(Ganja);
export const CategoryModel = getModelForClass(Category);
export const OrderModel = getModelForClass(Order);
export const ReviewModel = getModelForClass(Review);
