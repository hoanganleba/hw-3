import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QueryLoadDto } from './dto/query-load.dto';
import { Load, LoadDocument } from './schemas/load.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoadsService {
  constructor(
    @InjectModel(Load.name) private loadModel: Model<LoadDocument>,
    private jwtService: JwtService,
  ) {}

  fetchAllLoads(queryLoadDto: QueryLoadDto) {
    const loads = this.loadModel.find({}).limit(queryLoadDto.limit || 0);
    return { loads };
  }

  findOne(id: number) {
    return `This action returns a #${id} load`;
  }

  remove(id: number) {
    return `This action removes a #${id} load`;
  }
}
