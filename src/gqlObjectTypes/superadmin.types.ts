import { Field, InputType } from "type-graphql";

@InputType({ description: "New Super Admin data" })
export class SuperAdminInput {

    @Field()
    name: string;
  
    @Field()
    email: string;
  
    @Field()
    phone: string;
  
    @Field()
    password: string;
  
    @Field(()=>[String],{nullable:true})
    roles: string[];
}
