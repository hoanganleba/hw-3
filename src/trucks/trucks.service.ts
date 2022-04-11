import { ForbiddenException, Injectable } from '@nestjs/common';
import { AddTruckDto } from './dto/add-truck.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Truck, TruckDocument } from './schemas/truck.schema';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { UpdateTruckDto } from './dto/update-truck.dto';

@Injectable()
export class TrucksService {
  constructor(
    @InjectModel(Truck.name) private truckModel: Model<TruckDocument>,
  ) {}

  async assignTruck(id: string, userId: string) {
    await this.truckModel.findByIdAndUpdate(id, {
      assignedTo: new mongoose.Types.ObjectId(userId),
    });

    return { message: 'Truck assigned successfully' };
  }

  async addTruck(userId: string, addTruckDto: AddTruckDto) {
    const newTruck = new this.truckModel({
      createdBy: new mongoose.Types.ObjectId(userId),
      type: addTruckDto.type,
    });
    await newTruck.save();
    return { message: 'Truck created successfully' };
  }

  async fetchAllTrucks() {
    const trucks = await this.truckModel.find();
    return { trucks };
  }

  async fetchTruck(id: string) {
    const truck = await this.truckModel.findById(id);
    return { truck };
  }

  async updateTruck(
    id: string,
    userId: string,
    updateTruckDto: UpdateTruckDto,
  ) {
    const truck = await this.truckModel.findOne({
      _id: id,
      createdBy: new mongoose.Types.ObjectId(userId),
    });
    if (truck) {
      if ((truck as any).assignedTo === userId) {
        throw new ForbiddenException('You cannot modify assigned truck');
      }
      await this.truckModel.findByIdAndUpdate(id, {
        type: updateTruckDto.type,
      });
      return { message: 'Truck details changed successfully' };
    }
    throw new ForbiddenException('Only owner can modify the truck profile');
  }

  async removeTruck(id: string, userId: string) {
    const truck = await this.truckModel.find({
      createdBy: new mongoose.Types.ObjectId(userId),
    });
    if (truck) {
      if ((truck as any).assignedTo === userId) {
        throw new ForbiddenException('You cannot delete assigned truck');
      }
      await this.truckModel.findByIdAndDelete(id);
      return { message: 'Truck deleted successfully' };
    }
    throw new ForbiddenException('Only owner can modify the truck profile');
  }
}
