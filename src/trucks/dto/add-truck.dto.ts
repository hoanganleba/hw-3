import { ApiProperty } from '@nestjs/swagger';
import { TruckType } from '../../enums/truckType.enum';

export class AddTruckDto {
  @ApiProperty({ enum: TruckType })
  type: TruckType;
}
