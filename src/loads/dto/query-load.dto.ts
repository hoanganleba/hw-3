import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryLoadDto {
  @ApiPropertyOptional()
  status?: string;
  @ApiPropertyOptional()
  limit?: number;
}
