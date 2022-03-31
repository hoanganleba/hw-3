import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

enum Role {
  DRIVER = 'DRIVER',
  SHIPPER = 'SHIPPER',
}

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: Role;

  @Prop({ default: Date.now() })
  createdDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
