import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

class Fullname {
    @Prop({required: false})
    firstName?: string;

    @Prop({required: false})
    lastName?: string;
}

@Schema()
export class User{
    
    @Prop({required: true, unique: true})
    username: string;

    @Prop({type: Fullname, required: false,})
    fullname?: Fullname;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true})
    dateOfBirth: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);