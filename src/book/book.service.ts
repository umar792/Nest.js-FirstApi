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
    async CreateBook(book:any, res:Response){
        const {title, description, price, author} = book;
        if(!title || !description || !price || !author){
            return res.status(400).json( {
                success : false,
                message : "please fill all the fields"
            })
        }

        const books = await this.bookModel.create({
            title,
            description,
            price,
            author
        })
        res.status(200).json({
            success : true,
            books
        })
    } 

    // ---- get single book 
    async GetBook(id:string, res:Response){

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success : false,
                message : "invalid id"
            })
        }

       const book = await this.bookModel.findById(id);
       if(!book){
          return res.status(400).json({
            success : false,
            message : "book not found"
          })
       }
       return res.status(200).json({
        success : true,
        book
       })
    }


    // --- update book by id 
    async UpdateBook(id:string, req:Request, res:Response){
         if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success : false,
                message : "invalid id"
            })
        };

        // ---- find the book 
        const book = await this.bookModel.findById(id);
        if(!book){
           return res.status(400).json({
             success : false,
             message : "book not found"
           })
        }
        // ---- update the book
        const updatedBook =await this.bookModel.findByIdAndUpdate(id, req.body, {new : true});
        return res.status(200).json({
            success : true,
            message : "book updated successfully",
            book : updatedBook
        })
        
    }

    // ---- DeleteBook
    async DeleteBook(id:string, res:Response){
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success : false,
                message : "invalid id"
            })
        };
        const book = await this.bookModel.findById(id);
        if(!book){
            return res.status(400).json({
                success : false,
                message : "book not found"
            })
    
        };
        await this.bookModel.findByIdAndDelete(id);
        return res.status(200).json({
            success : true,
            message : "book deleted successfully"
        })
    }
}