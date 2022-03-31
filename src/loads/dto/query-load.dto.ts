import { ApiProperty } from '@nestjs/swagger';

export class QueryLoadDto {
  @ApiProperty()
  status?: string;
  @ApiProperty()
  limit?: number;
}
