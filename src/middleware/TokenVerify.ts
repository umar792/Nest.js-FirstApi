// import { Injectable, Req } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { NextFunction, Request, Response } from 'express';
// import * as mongoose from 'mongoose';
// import { User } from 'src/auth/schema/AuthSchema';
// import * as jwt from 'jsonwebtoken';

// @Injectable()
// export class TokenVerify {
//   constructor(
//     @InjectModel(User.name)
//     private UserModal: mongoose.Model<User>,
//   ) {}

//   async Verify(req: Request, res: Response, next: NextFunction) {
//     const token = await req.headers['token'];
//     if (!token) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid token',
//       });
//     }

//     const decode = await jwt.verify(token, 'umar');

//     const user = await this.UserModal.findById(decode.id);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'Invalid or expire token',
//       });
//     }
//   }
// }
