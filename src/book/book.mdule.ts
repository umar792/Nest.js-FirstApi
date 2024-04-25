import { Module } from "@nestjs/common";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { MongooseModule } from "@nestjs/mongoose";
import { BookModal } from "./schema/bookschem";

@Module({
    imports : [MongooseModule.forFeature([{name : "BookSchema", schema : BookModal}])],
    controllers : [BookController],
    providers: [BookService]
})
export class BookModule{}