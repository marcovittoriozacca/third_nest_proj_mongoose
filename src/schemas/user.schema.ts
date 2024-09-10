import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
class Fullname {
  @Prop({ required: false, default: null })
  firstName?: string;

  @Prop({ required: false, default: null })
  lastName?: string;
}

const FullnameSchema = new MongooseSchema({
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
});

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({
    type: FullnameSchema,
    required: false,
    default: { firstName: null, lastName: null },
    _id: false,
  })
  fullname?: Fullname;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ required: false, default: null })
  image?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
