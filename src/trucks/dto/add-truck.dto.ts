import { ApiProperty } from '@nestjs/swagger';
import { TruckType } from 'src/enums/TruckType';

export class AddTruckDto {
  @ApiProperty({ enum: TruckType })
  type: TruckType;
}
