import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { TruckType } from '../../enums/truckType.enum';
import { TruckStatus } from '../../enums/truckStatus.enum';

export type TruckDocument = Truck & Document;

@Schema()
export class Truck {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  createdBy: User;

  @Prop({ default: '' })
  assignedTo: string;

  @Prop({ enum: TruckType, required: true })
  type: TruckType;

  @Prop({ enum: TruckStatus, required: true, default: TruckStatus.IS })
  status: TruckStatus;

  @Prop({ default: Date.now() })
  createdDate: Date;
}

export const TruckSchema = SchemaFactory.createForClass(Truck);
