import { prop, pre, modelOptions, Ref, index } from "@typegoose/typegoose";
import { User } from "./userModel";
import { Ganja } from "./ganjaModel";

export type CreateReviewInput = {
  content: string;
  user: User["_id"];
  ganja: Ganja["_id"];
};

@index({ ganja: 1, user: 1 }, { unique: true })
@pre<Review>(/^find/, function (next) {
  this.populate({ path: "user", select: "name photo" });
  next();
})
@pre<Review>(/^find/, function (next) {
  this.populate({ path: "ganja", select: "coverImage" });
  next();
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export class Review {
  _id?: string;

  @prop({ required: true, trim: true, maxlength: 260 })
  content: string;

  @prop({ min: 1, max: 5, default: 1 })
  rating: number;

  @prop({ required: true, ref: () => User, type: () => User })
  user: Ref<User>;

  @prop({ required: true, ref: () => Ganja, type: () => Ganja })
  ganja: Ref<Ganja>;
}
