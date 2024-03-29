import "reflect-metadata";
import { Resolver, Query, Arg, Mutation } from "type-graphql"
import SuperAdminModel, { SuperAdmin } from "../models/SuperAdmin";
import { SuperAdminInput } from "../gqlObjectTypes/superadmin.types";

@Resolver()
export class SuperAdminResolver {
    @Query(() => [SuperAdmin])
    async superadmins(): Promise<SuperAdmin[]> {
        const cats = await SuperAdminModel.find();
        console.log(cats);
        return cats;
    }

    @Query(() => SuperAdmin)
    async superAdminDt(
        @Arg("id") id : String
    ): Promise<SuperAdmin> {
        const superAdmin = await SuperAdminModel.findById(id);
        return superAdmin;
    }

    @Mutation(() => SuperAdmin)
    async addSuperAdmin(
        @Arg("input") input: SuperAdminInput
    ): Promise<SuperAdmin> {
        const user = new SuperAdminModel({...input});
        const result = await user.save();
        return result;
    }

    @Mutation(() => SuperAdmin)
    async updateSuperAdmin(
        @Arg("input") input: SuperAdminInput,
        @Arg("id") id: string
    ): Promise<SuperAdmin> {
        const result = await SuperAdminModel.findByIdAndUpdate(id,{
            $set:{
                name: input.name,
                password: input.password,
                email:input.email,
                phone:input.phone,
                roles:input.roles
            }
        });
        return result;
    }
}
