"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.ShippingAddress = exports.OrderItem = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const ganjaModel_1 = require("./ganjaModel");
const userModel_1 = require("./userModel");
class OrderItem {
}
exports.OrderItem = OrderItem;
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], OrderItem.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], OrderItem.prototype, "coverImage", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], OrderItem.prototype, "price", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => ganjaModel_1.Ganja, type: () => ganjaModel_1.Ganja }),
    __metadata("design:type", Object)
], OrderItem.prototype, "ganja", void 0);
class ShippingAddress {
}
exports.ShippingAddress = ShippingAddress;
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], ShippingAddress.prototype, "fullName", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], ShippingAddress.prototype, "address", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], ShippingAddress.prototype, "city", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], ShippingAddress.prototype, "postalCode", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], ShippingAddress.prototype, "country", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], ShippingAddress.prototype, "lat", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], ShippingAddress.prototype, "lng", void 0);
class PaymentResult {
}
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], PaymentResult.prototype, "paymentId", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], PaymentResult.prototype, "status", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], PaymentResult.prototype, "update_time", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], PaymentResult.prototype, "email_address", void 0);
let Order = class Order {
};
exports.Order = Order;
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Array)
], Order.prototype, "orderItems", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", ShippingAddress)
], Order.prototype, "shippingAddress", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Order.prototype, "paymentMethod", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", PaymentResult)
], Order.prototype, "paymentResult", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "itemsPrice", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "taxPrice", void 0);
__decorate([
    (0, typegoose_1.prop)({ require: true, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "shippingPrice", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "totalPrice", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: false }),
    __metadata("design:type", Boolean)
], Order.prototype, "isPaid", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: false }),
    __metadata("design:type", Boolean)
], Order.prototype, "isDelivered", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Date)
], Order.prototype, "paidAt", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Date)
], Order.prototype, "deliveredAt", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => userModel_1.User, type: () => userModel_1.User }),
    __metadata("design:type", Object)
], Order.prototype, "user", void 0);
exports.Order = Order = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: { timestamps: true },
        options: { allowMixed: typegoose_1.Severity.ALLOW },
    })
], Order);
