import { Module } from "@nestjs/common";
import e from "express";
import { AuthController } from "./Auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModal, User } from "./schema/AuthSchema";
import { AuthsServices } from "./auths.service";


@Module({
    imports: [
        MongooseModule.forFeature([{name : User.name, schema : AuthModal}])
    ],
    controllers: [AuthController],
    providers: [AuthsServices],
})
export class AuthModule{};