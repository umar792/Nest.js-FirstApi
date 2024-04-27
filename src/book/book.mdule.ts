import { Module } from "@nestjs/common";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { MongooseModule } from "@nestjs/mongoose";
import { BookModal } from "./schema/bookschem";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports : [
         AuthModule,
        MongooseModule.forFeature([{name : "BookSchema", schema : BookModal}])],
        
    controllers : [BookController],
    providers: [BookService]
})
export class BookModule{}