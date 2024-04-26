import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true
})

export class User {
    @Prop({required : [true, "Plaese enter your username"]})
    username: string;

    @Prop({required : [true, "Plaese enter your password"]})
    password: string;

    @Prop({required : [true, "Plaese enter your email"]})
    email: string;
};

export const AuthModal = SchemaFactory.createForClass(User);