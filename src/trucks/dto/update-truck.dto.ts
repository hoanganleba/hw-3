import { PartialType } from '@nestjs/mapped-types';
import { AddTruckDto } from './add-truck.dto';

export class UpdateTruckDto extends PartialType(AddTruckDto) {}
