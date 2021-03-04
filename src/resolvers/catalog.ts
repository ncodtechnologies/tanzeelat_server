import "reflect-metadata";
import { Resolver, Query, Arg, Mutation } from "type-graphql"
import CatalogModel, { Catalog } from "../models/Catalog";
import { CatalogInput, UpdPagesInput, UploadRespType } from "../gqlObjectTypes/catalog.type";
import { v4 as uuidv4 } from 'uuid';

const path = require("path");
 
const ID = 'AKIAID3BSRIGM4OQ5J6A';
const SECRET = '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';

const BUCKET_NAME = 'tanzeelat';
const AWS = require('aws-sdk');

@Resolver()
export class CatalogResolver {
    
    @Query(() => [Catalog])
    async catalogs(
        @Arg("vendorId") vendorId : String
    ): Promise<Catalog[]> {
        return await CatalogModel.find({vendorId});
    }
    
    @Query(() => [Catalog])
    async activeCatalogs(): Promise<Catalog[]> {
        return await CatalogModel.find().populate("outlets");
    }
    
    @Query(() => Catalog)
    async catalogDt(
        @Arg("id") id : String
    ): Promise<Catalog> {
        return await CatalogModel.findById(id);
    }

    @Mutation(() => Catalog)
    async addCatalog(
        @Arg("input") input: CatalogInput
    ): Promise<Catalog> {
        const user = new CatalogModel({...input});
        const result = await user.save()
        return result;
    }

    @Mutation(() => UploadRespType)
    async updCatalogPages(
        @Arg("pages",() => UpdPagesInput)  pages : UpdPagesInput
    ): Promise<UploadRespType> {
        console.log(pages)

        const s3 = new AWS.S3({
            accessKeyId: ID,
            secretAccessKey: SECRET
        });

        let catalog = await CatalogModel.findById(pages.catalogId);
        let _pages = [...catalog.pages];

        if(!catalog)
            return { result : false };

        let i = 0;
        for(const file of pages?.files)
        {
            if(file.newImg)
            {
                const { createReadStream, filename, mimetype } = await file?.newImg;

                const { Location } = await s3.upload({ // (C)
                    Bucket: BUCKET_NAME,
                    Body: createReadStream(),               
                    Key: `${uuidv4()}${path.extname(filename)}`,  
                    ContentType: mimetype                   
                }).promise();       

                if(file.oldImg)
                    try {
                        await s3.deleteObject({
                            Bucket: BUCKET_NAME,
                            Key: file.oldImg.split('/').pop()
                        }).promise()
                        console.log("file deleted Successfully")
                    }
                    catch (err) {
                        console.log("ERROR in file Deleting : " + JSON.stringify(err))
                    }
                
                console.log(Location);
                _pages[i] = Location;
            }
            i++;
        }

        await CatalogModel.findByIdAndUpdate(pages.catalogId,{
            $set: {
                pages: _pages
            }
        })

        return { result: true };
    }
}
