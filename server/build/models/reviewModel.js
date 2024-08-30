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
exports.Review = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const userModel_1 = require("./userModel");
const ganjaModel_1 = require("./ganjaModel");
let Review = class Review {
};
exports.Review = Review;
__decorate([
    (0, typegoose_1.prop)({ required: true, trim: true, maxlength: 260 }),
    __metadata("design:type", String)
], Review.prototype, "content", void 0);
__decorate([
    (0, typegoose_1.prop)({ min: 1, max: 5, default: 1 }),
    __metadata("design:type", Number)
], Review.prototype, "rating", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => userModel_1.User, type: () => userModel_1.User }),
    __metadata("design:type", Object)
], Review.prototype, "user", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => ganjaModel_1.Ganja, type: () => ganjaModel_1.Ganja }),
    __metadata("design:type", Object)
], Review.prototype, "ganja", void 0);
exports.Review = Review = __decorate([
    (0, typegoose_1.index)({ ganja: 1, user: 1 }, { unique: true }),
    (0, typegoose_1.pre)(/^find/, function (next) {
        this.populate({ path: "user", select: "name photo" });
        next();
    }),
    (0, typegoose_1.pre)(/^find/, function (next) {
        this.populate({ path: "ganja", select: "coverImage" });
        next();
    }),
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: true,
            toJSON: { virtuals: true },
            toObject: { virtuals: true },
        },
    })
], Review);
