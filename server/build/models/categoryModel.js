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
exports.Category = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const ganjaModel_1 = require("./ganjaModel");
const slugify_1 = __importDefault(require("slugify"));
let Category = class Category {
};
exports.Category = Category;
__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true, trim: true }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Category.prototype, "slug", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Category.prototype, "origin", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, maxlength: 100 }),
    __metadata("design:type", String)
], Category.prototype, "description", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Category.prototype, "cbdToThcRatio", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Category.prototype, "effectsOfUse", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Category.prototype, "periodOfUse", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Category.prototype, "coverImage", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => ganjaModel_1.Ganja, type: () => ganjaModel_1.Ganja }),
    __metadata("design:type", Array)
], Category.prototype, "ganjas", void 0);
exports.Category = Category = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: { timestamps: true },
    }),
    (0, typegoose_1.pre)("save", function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.slug = (0, slugify_1.default)(this.name, { lower: true });
        });
    }),
    (0, typegoose_1.pre)(/^find/, function () {
        this.populate({ path: "ganjas", select: "-slug" });
    })
], Category);
