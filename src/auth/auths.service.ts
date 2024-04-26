import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/AuthSchema';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthsServices {
  constructor(
    @InjectModel(User.name)
    private authModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  // -- signUp User
  async SignUp(req: Request, res: Response) {
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a all field',
      });
    }
    // -- check is email exist
    const isEmail = await this.authModel.findOne({ email: email });
    if (isEmail) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
      });
    }

    // --- now has the password
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await this.authModel.create({
      email,
      username,
      password: hashPassword,
    });
    const Token = await this.jwtService.sign({ id: user._id });
    res.status(200).json({
      success: true,
      message: 'SignUp successfully',
      user,
      Token,
    });
  }

  // ---- signup user
  async Login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please enter your email and password',
      });
    }

    // --- now check is user exist in our data base
    const IsUser = await this.authModel.findOne({ email });
    if (!IsUser) {
      return res.status(400).json({
        success: false,
        message: 'Inavlid email or password',
      });
    }

    // --- compare the password
    const isMatch = await bcrypt.compare(password, IsUser.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Inavlid email or password',
      });
    }

    // ----- noe generate the token
    const Token = await this.jwtService.sign({ id: IsUser._id });

    res.status(200).json({
      success: true,
      message: 'Login successfully',
      Token,
    });
  }
}
