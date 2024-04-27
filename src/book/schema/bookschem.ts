import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";


@Schema({
    timestamps : true,

})
export class BookSchema {
    
    @Prop({required : [true, "Plaese Enter Books Title"]})
    title: string;

    @Prop({required : [true, "Plaese Enter Books Author"], type : mongoose.Types.ObjectId , ref : "User"})
    author: string;

    @Prop({required : [true, "Plaese Enter Books Description"]})
    description: string;

    @Prop({required : [true, "Plaese Enter Books Price"]})
    price: number;
};

export const BookModal = SchemaFactory.createForClass(BookSchema);