import { prop, pre, modelOptions, Severity, Ref } from "@typegoose/typegoose";
import slugify from "slugify";
import { Review } from "./reviewModel";

@pre<Ganja>("save", async function () {
  this.slug = slugify(this.name, { lower: true });
  return;
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  options: { allowMixed: Severity.ALLOW },
})
export class Ganja {
  _id?: string;

  @prop({ required: true, unique: true, trim: true })
  name: string;

  @prop({ required: true })
  category: string;

  @prop({ default: Date.now() })
  dataTested: Date;

  @prop({ required: true })
  thca: string;

  @prop({ required: true })
  thc: string;

  @prop({ required: true })
  cbda: string;

  @prop({ required: true })
  cbd: string;

  @prop({ required: true })
  summary: string;

  @prop()
  description: string;

  @prop()
  slug: string;

  @prop({ required: true, default: 0 })
  price: number;

  @prop({ required: true })
  coverImage: string;

  @prop({ required: true })
  rating: number;
  // virtuals
  @prop({
    ref: Review,
    foreignField: "ganja",
    localField: "_id",
    justOne: false,
  })
  reviews: Ref<Review>[];
}
