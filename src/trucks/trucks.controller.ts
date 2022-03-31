import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { TrucksService } from './trucks.service';
import { AddTruckDto } from './dto/add-truck.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UpdateTruckDto } from './dto/update-truck.dto';

@ApiTags('Truck')
@Controller('trucks')
@UseGuards(JwtAuthGuard)
export class TrucksController {
  constructor(private readonly trucksService: TrucksService) {}

  @Post()
  addTruck(@Req() req: Request, @Body() addTruckDto: AddTruckDto) {
    return this.trucksService.addTruck(req, addTruckDto);
  }

  @Post(':id/assign')
  assignTruck(@Param('id') id: number, @Req() req: Request) {
    return this.trucksService.assignTruck(id, req);
  }

  @Get()
  fetchAllTrucks(@Req() req: Request) {
    return this.trucksService.fetchAllTrucks(req);
  }

  @Get(':id')
  fetchTruck(@Param('id') id: number, @Req() req: Request) {
    return this.trucksService.fetchTruck(id, req);
  }

  @Put(':id')
  updateTruck(
    @Param('id') id: number,
    @Req() req: Request,
    @Body() updateTruckDto: UpdateTruckDto,
  ) {
    return this.trucksService.updateTruck(id, req, updateTruckDto);
  }

  @Delete(':id')
  removeTruck(@Param('id') id: number, @Req() req: Request) {
    return this.trucksService.removeTruck(id, req);
  }
}
