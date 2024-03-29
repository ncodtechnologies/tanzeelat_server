import { GraphQLUpload } from "graphql-upload";
import { Product } from "../models/Products";
import { Stream } from "stream";
import { Field, InputType, ObjectType } from "type-graphql";
import { Vendor } from "../models/Vendor";

@InputType({ description: "New Product data" })
export class ProductInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  namear: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  offerPrice?: number;

  @Field()
  vendorId: string;

  @Field()
  productCategoryId: string;

  @Field({ nullable: true })
  productSubCategoryId?: string;

  @Field(() => GraphQLUpload, { nullable: true })
  image: Upload;
}

@InputType({ description: "Product Bulk data" })
export class ProductBulkListInput {
  @Field()
  catalogId: string;

  @Field({ nullable: true })
  pageNo: number;
}

@InputType({ description: "Product Bulk data" })
export class ProductBulkInput {
  @Field()
  catalogId: string;

  @Field({ nullable: true })
  pageNo: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  namear: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  offerPrice?: number;

  @Field()
  vendorId: string;

  @Field()
  productCategoryId: string;

  @Field({ nullable: true })
  productSubCategoryId?: string;

  @Field(() => GraphQLUpload, { nullable: true })
  image: Upload;
}

@InputType({ description: "Product Filters" })
export class ProductFilters {
  @Field({ nullable: true })
  productSubCategoryId: string;

  @Field(() => [String], { nullable: true })
  vendorList?: [string];

  @Field(() => [String], { nullable: true })
  categoryList?: [string];

  @Field({ nullable: true })
  productCategoryId: string;

  @Field({ nullable: true })
  search?: string;
}

@ObjectType({ description: "New Product data" })
export class ProductOutput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Vendor)
  vendorId: Vendor;

  @Field()
  productCategoryId: string;

  @Field()
  productSubCategoryId: string;

  @Field()
  image: string;
}

@ObjectType({ description: "New Product data" })
export class ProductsByCategoryOutput {
  @Field()
  _id: string;

  @Field()
  productCategory: string;

  @Field(() => [Product])
  products: Product[];
}

@ObjectType()
export class ProductListResponse {
  @Field()
  subcategoryId: string;

  @Field()
  subcategory: string;

  @Field(() => [Product])
  products: Product[];
}

export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}
