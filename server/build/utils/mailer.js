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
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("config"));
const pug_1 = __importDefault(require("pug"));
const html_to_text_1 = require("html-to-text");
class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.userName.split(" ")[0];
        this.url = url;
        this.from = `${config_1.default.get("from")}`;
    }
    transporter() {
        const smtp = config_1.default.get("smtp");
        if (process.env.NODE_ENV === "production") {
            return nodemailer_1.default.createTransport({
                service: "Sendgrid",
                auth: {
                    user: config_1.default.get("sendgridUser"),
                    pass: config_1.default.get("sendgridPasss"),
                },
            });
        }
        return nodemailer_1.default.createTransport(Object.assign(Object.assign({}, smtp), { auth: { user: smtp.user, pass: smtp.pass } }));
    }
    sendEmail(template, subject) {
        return __awaiter(this, void 0, void 0, function* () {
            const html = pug_1.default.renderFile(`${__dirname}/../views/emails/${template}.pug`, { firstName: this.firstName, url: this.url, subject: subject });
            const mailOptions = {
                from: this.from,
                to: this.to,
                subject: subject,
                html: html,
                text: (0, html_to_text_1.convert)(html),
            };
            yield this.transporter().sendMail(mailOptions);
        });
    }
    sendWelcomeEmail() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendEmail("welcomeEmail", "Welcome new user. Please verify email");
        });
    }
    sendPasswordReset() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendEmail("passwordReset", "Your password reset token (valid for 10 minutes!)");
        });
    }
}
exports.default = Email;
