import { prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import Mongoose, { Model, Schema } from "mongoose";
import { Vendor } from "./Vendor";
import { ProductCategories } from "./ProductCategories";

@ObjectType({ description: "The Product model" })
export class Product {
  @prop()
  @Field(() => ID)
  id: string;

  @Field()
  _id: string;

  @prop()
  @Field({ nullable: true })
  name: string;

  @prop()
  @Field()
  namear?: string;

  @prop()
  @Field({ nullable: true })
  price?: number;

  @prop()
  @Field({ nullable: true })
  offerPrice?: number;

  @prop()
  @Field()
  vendorId: string;

  @prop()
  @Field()
  productCategoryId: string;

  @prop()
  @Field({ nullable: true })
  productSubCategoryId?: string;

  @prop()
  @Field({ nullable: true })
  image: string;

  @prop()
  @Field(() => Vendor, { nullable: true })
  vendor?: Vendor;

  @prop()
  @Field(() => ProductCategories, { nullable: true })
  productCategory: ProductCategories;

  @prop()
  @Field({ nullable: true })
  catalogId?: string;

  @prop()
  @Field({ nullable: true })
  pageNo?: number;
}

const productSchema = new Schema({
  name: String,
  namear: String,
  price: Number,
  offerPrice: Number,
  expiry: Date,
  vendorId: { type: Mongoose.Types.ObjectId, ref: "Vendor" },
  productCategoryId: {
    type: Mongoose.Types.ObjectId,
    ref: "ProductCategories",
  },
  productSubCategoryId: {
    type: Mongoose.Types.ObjectId,
    ref: "ProductSubCategories",
  },
  image: String,
  catalogId: { type: Mongoose.Types.ObjectId, ref: "Catalog" },
  pageNo: Number,
});

const ProductModel: Model<any> = Mongoose.model("Product", productSchema);

export default ProductModel;
