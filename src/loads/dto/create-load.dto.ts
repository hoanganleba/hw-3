import { ApiProperty } from '@nestjs/swagger';

interface Dimension {
  width: number;
  length: number;
  height: number;
}

export class CreateLoadDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  payload: number;
  @ApiProperty()
  pickupAddress: string;
  @ApiProperty()
  deliveryAddress: string;
  @ApiProperty()
  dimensions: Dimension;
}
