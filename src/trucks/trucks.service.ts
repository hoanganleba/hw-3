import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AddTruckDto } from './dto/add-truck.dto';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Truck, TruckDocument } from './schemas/truck.schema';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/enums/Role';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import mongoose from 'mongoose';
import { UpdateTruckDto } from './dto/update-truck.dto';

@Injectable()
export class TrucksService {
  constructor(
    @InjectModel(Truck.name) private truckModel: Model<TruckDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async assignTruck(id: number, req: Request) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const data: any = this.jwtService.decode(token);
    const user = await this.userModel.findById(data.id);

    if (user.role === Role.DRIVER) {
      await this.truckModel.findByIdAndUpdate(id, {
        assignedTo: new mongoose.Types.ObjectId(data.id),
      });

      return { message: 'Truck assigned successfully' };
    }

    throw new UnauthorizedException('Only driver can access this feature');
  }

  async addTruck(req: Request, addTruckDto: AddTruckDto) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const data: any = this.jwtService.decode(token);
    const user = await this.userModel.findById(data.id);

    if (user.role === Role.DRIVER) {
      const newTruck = new this.truckModel({
        createdBy: new mongoose.Types.ObjectId(data.id),
        type: addTruckDto.type,
      });
      await newTruck.save();
      return { message: 'Truck created successfully' };
    }

    throw new UnauthorizedException('Only driver can access this feature');
  }

  async fetchAllTrucks(req: Request) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const data: any = this.jwtService.decode(token);
    const user = await this.userModel.findById(data.id);

    if (user.role === Role.DRIVER) {
      const trucks = await this.truckModel.find({
        createdBy: new mongoose.Types.ObjectId(data.id),
      });
      return { trucks };
    }

    throw new UnauthorizedException('Only driver can access this feature');
  }

  async fetchTruck(id: number, req: Request) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const data: any = this.jwtService.decode(token);
    const user = await this.userModel.findById(data.id);

    if (user.role === Role.DRIVER) {
      const truck = await this.truckModel.findById(id);
      return { truck };
    }

    throw new UnauthorizedException('Only driver can access this feature');
  }

  async updateTruck(id: number, req: Request, updateTruckDto: UpdateTruckDto) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const data: any = this.jwtService.decode(token);
    const user = await this.userModel.findById(data.id);

    if (user.role === Role.DRIVER) {
      const truck = await this.truckModel.find({
        createdBy: new mongoose.Types.ObjectId(data.id),
      });
      if (truck) {
        await this.truckModel.findByIdAndUpdate(id, {
          type: updateTruckDto.type,
        });
        return { message: 'Truck details changed successfully' };
      }
      throw new UnauthorizedException(
        'Only owner can modify the truck profile',
      );
    }

    throw new UnauthorizedException('Only driver can access this feature');
  }

  async removeTruck(id: number, req: Request) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const data: any = this.jwtService.decode(token);
    const user = await this.userModel.findById(data.id);

    if (user.role === Role.DRIVER) {
      const truck = await this.truckModel.find({
        createdBy: new mongoose.Types.ObjectId(data.id),
      });
      if (truck) {
        await this.truckModel.findByIdAndDelete(id);
        return { message: 'Truck deleted successfully' };
      }
      throw new UnauthorizedException(
        'Only owner can modify the truck profile',
      );
    }

    throw new UnauthorizedException('Only driver can access this feature');
  }
}
