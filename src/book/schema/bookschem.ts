import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps : true,

})
export class BookSchema {
    
    @Prop({required : [true, "Plaese Enter Books Title"]})
    title: string;

    @Prop({required : [true, "Plaese Enter Books Author"]})
    author: string;

    @Prop({required : [true, "Plaese Enter Books Description"]})
    description: string;

    @Prop({required : [true, "Plaese Enter Books Price"]})
    price: number;
};

export const BookModal = SchemaFactory.createForClass(BookSchema);