import { Controller, Post, Req, Res } from "@nestjs/common";
import { AuthsServices } from "./auths.service";
import { Request, Response } from "express";



@Controller("user")
export class AuthController{
    constructor(
        private authService: AuthsServices
    ){}

    // --- signup the user 
    @Post("/signup")
    async signup(@Req() req:Request , @Res() res:Response){
        return await this.authService.SignUp(req,res)
    }
    // ---- login 
    @Post("/login")
    async Login(@Req() req:Request , @Res() res:Response){
        return await this.authService.Login(req,res)
    }
}