import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { State } from 'src/enums/State';
import { Status } from 'src/enums/Status';
import { User } from 'src/users/schemas/user.schema';

export type LoadDocument = Load & Document;

@Schema()
class Dimensions {
  @Prop()
  width: number;
  @Prop()
  length: number;
  @Prop()
  height: number;
}

@Schema()
class Logs {
  @Prop()
  message: string;
  @Prop()
  time: Date;
}

@Schema()
export class Load {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  createdBy: User;

  @Prop({ default: '' })
  assignedTo: string;

  @Prop({ required: true, default: Status.NEW })
  status: Status;

  @Prop({ required: true, default: State.En_route_to_Pick_Up })
  state: State;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  payload: number;

  @Prop({ required: true })
  pickupAddress: string;

  @Prop({ required: true })
  deliveryAddress: string;

  @Prop({ required: true })
  dimensions: Dimensions;

  @Prop({ required: true })
  logs: Array<Logs>;

  @Prop({ default: Date.now() })
  createdDate: Date;
}

export const LoadSchema = SchemaFactory.createForClass(Load);
