import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QueryLoadDto } from './dto/query-load.dto';
import { Load, LoadDocument } from './schemas/load.schema';
import { Model } from 'mongoose';
import { Request } from 'express';
import { CreateLoadDto } from './dto/create-load.dto';
import mongoose from 'mongoose';
import { UpdateLoadDto } from './dto/update-load.dto';
import { Status } from '../enums/status.enum';

@Injectable()
export class LoadsService {
  constructor(@InjectModel(Load.name) private loadModel: Model<LoadDocument>) {}

  async fetchAllLoads(queryLoadDto: QueryLoadDto) {
    const loads = await this.loadModel.find({}).limit(queryLoadDto.limit || 0);
    return { loads };
  }

  async fetchLoad(id: string) {
    const load = await this.loadModel.findById(id);
    return { load };
  }

  async createLoad(userId: string, createLoadDto: CreateLoadDto) {
    const newLoad = new this.loadModel({
      createdBy: new mongoose.Types.ObjectId(userId),
      name: createLoadDto.name,
      payload: createLoadDto.payload,
      pickupAddress: createLoadDto.pickupAddress,
      deliveryAddress: createLoadDto.deliveryAddress,
      dimensions: createLoadDto.dimensions,
    });
    await newLoad.save();
    return { message: 'Load created successfully' };
  }

  async changeLoadState(req: Request) {
    return 'Under development';
  }

  async updateLoad(id: string, updateLoadDto: UpdateLoadDto) {
    const load = await this.loadModel.findById(id);
    if (load.status === Status.NEW) {
      await this.loadModel.findByIdAndUpdate(id, updateLoadDto);
      return { message: 'Load details changed successfully' };
    }

    throw new ForbiddenException('Load cannot be changed after posted');
  }

  async removeLoad(id: string) {
    const load = await this.loadModel.findById(id);
    if (load.status === Status.NEW) {
      await this.loadModel.findByIdAndDelete(id);
      return { message: 'Load details changed successfully' };
    }
    throw new ForbiddenException('Load cannot be deleted after posted');
  }
}
