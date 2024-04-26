import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AuthSchema } from "./schema/AuthSchema";
import * as mongoose from "mongoose";



@Injectable()

export class AuthsServices{
    constructor(
        @InjectModel(AuthSchema.name)
        private authModel: mongoose.Model<AuthSchema>
    ){}
}