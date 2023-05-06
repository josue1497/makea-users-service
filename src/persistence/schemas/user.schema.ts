import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

class Address {
  @Prop()
  street: string;
  @Prop()
  suite: string;
  @Prop()
  city: string;
  @Prop()
  zipcode: string;
}
@Schema()
export class User {
  @Prop()
  name: string | Types.ObjectId;

  @Prop({ unique: true })
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  recoveryToken: string;

  @Prop({ type: Address })
  address: Address;

  @Prop()
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
