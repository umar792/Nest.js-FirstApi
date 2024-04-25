import { Controller, Get, Post, Req, Res } from "@nestjs/common";
import { BookService } from "./book.service";
import { Request, Response } from "express";


@Controller("books")
export class BookController {
   
    constructor(private bookService: BookService){};


    @Get("/")
      GetBooks(): object {
        return this.bookService.GetBooks();
      }


    //   ---- create book 
    @Post("/create")
    async CreateBook(@Req() req:Request, @Res() res:Response){

        return await this.bookService.CreateBook(req,res)
    }




}