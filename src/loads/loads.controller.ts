import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { LoadsService } from './loads.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { QueryLoadDto } from './dto/query-load.dto';

@ApiTags('Load')
@Controller('loads')
@UseGuards(JwtAuthGuard)
export class LoadsController {
  constructor(private readonly loadsService: LoadsService) {}

  @Get()
  fetchAllLoads(@Query() queryLoadDto: QueryLoadDto) {
    return this.loadsService.fetchAllLoads(queryLoadDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loadsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loadsService.remove(+id);
  }
}
