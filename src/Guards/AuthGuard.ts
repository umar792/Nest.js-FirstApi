import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import * as mongoose from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt"
import { User } from "src/auth/schema/AuthSchema";



@Injectable()
export class AuthVerify extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(User.name)
        private UserModal: mongoose.Model<User>
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : process.env.JWT_SECRET
        })
    }


    async validate(payload:any){
        const {id} = payload;
        const user = await this.UserModal.findById(id);
        if(!user){
            throw new UnauthorizedException("Please login to access this route")
        }
        return user;
    }
}