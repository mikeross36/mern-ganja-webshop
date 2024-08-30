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
exports.Ganja = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const slugify_1 = __importDefault(require("slugify"));
const reviewModel_1 = require("./reviewModel");
let Ganja = class Ganja {
};
exports.Ganja = Ganja;
__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true, trim: true }),
    __metadata("design:type", String)
], Ganja.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Ganja.prototype, "category", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: Date.now() }),
    __metadata("design:type", Date)
], Ganja.prototype, "dataTested", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Ganja.prototype, "thca", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Ganja.prototype, "thc", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Ganja.prototype, "cbda", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Ganja.prototype, "cbd", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Ganja.prototype, "summary", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Ganja.prototype, "description", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Ganja.prototype, "slug", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Ganja.prototype, "price", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Ganja.prototype, "coverImage", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], Ganja.prototype, "rating", void 0);
__decorate([
    (0, typegoose_1.prop)({
        ref: reviewModel_1.Review,
        foreignField: "ganja",
        localField: "_id",
        justOne: false,
    }),
    __metadata("design:type", Array)
], Ganja.prototype, "reviews", void 0);
exports.Ganja = Ganja = __decorate([
    (0, typegoose_1.pre)("save", function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.slug = (0, slugify_1.default)(this.name, { lower: true });
            return;
        });
    }),
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: true,
            toJSON: { virtuals: true },
            toObject: { virtuals: true },
        },
        options: { allowMixed: typegoose_1.Severity.ALLOW },
    })
], Ganja);
