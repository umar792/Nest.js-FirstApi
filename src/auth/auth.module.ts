import { Module } from "@nestjs/common";
import { AuthController } from "./Auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModal, User } from "./schema/AuthSchema";
import { AuthsServices } from "./auths.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AuthVerify } from "src/Guards/AuthGuard";


@Module({
    imports: [
        MongooseModule.forFeature([{name : User.name, schema : AuthModal}]),
        PassportModule.register({defaultStrategy : "jwt"}),
        JwtModule.registerAsync({
            inject : [ConfigService],
            useFactory: (config: ConfigService)=>{
                return{
                    secret : config.get("JWT_SECRET"),
                    signOptions: {
                        expiresIn: config.get<string | number>('JWT_EXPIRE'),
                      },  
                }
            }
            
        })
    ],
    controllers: [AuthController],
    providers: [AuthsServices, AuthVerify],
    exports : [AuthVerify, PassportModule]
})
export class AuthModule{};

export { AuthVerify };
