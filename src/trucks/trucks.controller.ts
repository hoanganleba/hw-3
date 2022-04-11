import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TrucksService } from './trucks.service';
import { AddTruckDto } from './dto/add-truck.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../enums/role.enum';
import { Roles } from '../decorators/role.decorator';

@ApiTags('Truck')
@Controller('trucks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class TrucksController {
  constructor(private readonly trucksService: TrucksService) {}

  @Post()
  @Roles(Role.DRIVER)
  addTruck(@Req() req: Request, @Body() addTruckDto: AddTruckDto) {
    const userId = (req.user as any).id;
    return this.trucksService.addTruck(userId, addTruckDto);
  }

  @Post(':id/assign')
  @Roles(Role.DRIVER)
  assignTruck(
    @Param('id')
    id: string,
    @Req() req: Request,
  ) {
    const userId = (req.user as any).id;
    return this.trucksService.assignTruck(id, userId);
  }

  @Get()
  @Roles(Role.DRIVER)
  fetchAllTrucks() {
    return this.trucksService.fetchAllTrucks();
  }

  @Get(':id')
  @Roles(Role.DRIVER)
  fetchTruck(@Param('id') id: string) {
    return this.trucksService.fetchTruck(id);
  }

  @Put(':id')
  @Roles(Role.DRIVER)
  updateTruck(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() updateTruckDto: UpdateTruckDto,
  ) {
    const userId = (req.user as any).id;
    return this.trucksService.updateTruck(id, userId, updateTruckDto);
  }

  @Delete(':id')
  @Roles(Role.DRIVER)
  removeTruck(@Param('id') id: string, @Req() req: Request) {
    const userId = (req.user as any).id;
    return this.trucksService.removeTruck(id, userId);
  }
}
