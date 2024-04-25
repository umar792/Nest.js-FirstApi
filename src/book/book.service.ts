import { Injectable, Req, Res } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BookSchema } from "./schema/bookschem";
import * as mongoose from "mongoose";
import { Request, Response } from "express";


@Injectable()
export class BookService {

    constructor(
        @InjectModel(BookSchema.name)
        private bookModel: mongoose.Model<BookSchema>
    ) { }

    async GetBooks() {
        const books = await this.bookModel.find();
        return {
            success: true,
            books

        }
    }

    // --- create book 
    async CreateBook(req:Request, res:Response){
        const {title, description, price, author} = req.body;
        if(!title || !description || !price || !author){
            return res.status(400).json( {
                success : false,
                message : "please fill all the fields"
            })
        }

        const book = await this.bookModel.create({
            title,
            description,
            price,
            author
        })
        res.status(200).json({
            success : true,
            book
        })
    } 
}