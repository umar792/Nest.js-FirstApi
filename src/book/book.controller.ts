import { Body, Controller, Delete, Get, Param, Post, Req, Res, UseGuards } from "@nestjs/common";
import { BookService } from "./book.service";
import { Request, Response } from "express";
import { CreateBookdto } from "./books.dto/Createbook.dto";
import { BookSchema } from "./schema/bookschem";
import { AuthVerify } from "src/Guards/AuthGuard";
import { AuthGuard } from "@nestjs/passport";


@Controller("books")
export class BookController {
   
    constructor(private bookService: BookService){};


    @Get("/")
      GetBooks(): object {
        return this.bookService.GetBooks();
      }


    //   ---- create book 
    @UseGuards(AuthGuard())
    @Post("/create")
    async CreateBook(@Req() req:Request, @Res() res:Response){

        return await this.bookService.CreateBook(req,res)
    }

    // ---- get book 
    @Get("/:id")
    async GetBook(@Param("id") id: string, @Res() res:Response){
        return await this.bookService.GetBook(id,res)
    }

    // --- update book 
    @Post("/update/:id")
    async UpdateBook(@Param("id") id:string, @Req()  req:Request , @Res() res:Response){
        return await this.bookService.UpdateBook(id,req,res);
    }

    // --- delete 
    @Delete("/delete/:id")
    async DeleteBook(@Param("id") id:string, @Res() res:Response){
        return await this.bookService.DeleteBook(id,res);
    }



}