import { prop, modelOptions, Ref, pre } from "@typegoose/typegoose";
import { Ganja } from "./ganjaModel";
import slugify from "slugify";

@modelOptions({
  schemaOptions: { timestamps: true },
})
@pre<Category>("save", async function () {
  this.slug = slugify(this.name, { lower: true });
})
@pre<Ganja>(/^find/, function () {
  this.populate({ path: "ganjas", select: "-slug" });
})
export class Category {
  @prop({ required: true, unique: true, trim: true })
  name: string;

  @prop()
  slug: string;

  @prop({ required: true })
  origin: string;

  @prop({ required: true, maxlength: 100 })
  description: string;

  @prop({ required: true })
  cbdToThcRatio: string;

  @prop({ required: true })
  effectsOfUse: string;

  @prop({ required: true })
  periodOfUse: string;

  @prop({ required: true })
  coverImage: string;

  @prop({ required: true, ref: () => Ganja, type: () => Ganja })
  ganjas: Ref<Ganja>[];
}
