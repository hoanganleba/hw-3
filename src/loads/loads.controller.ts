import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Query,
  Post,
  Req,
  Body,
  Put,
  Patch,
} from '@nestjs/common';
import { LoadsService } from './loads.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { QueryLoadDto } from './dto/query-load.dto';
import { Request } from 'express';
import { CreateLoadDto } from './dto/create-load.dto';
import { UpdateLoadDto } from './dto/update-load.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';

@ApiTags('Load')
@Controller('loads')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class LoadsController {
  constructor(private readonly loadsService: LoadsService) {}

  @Get()
  fetchAllLoads(@Query() queryLoadDto: QueryLoadDto) {
    return this.loadsService.fetchAllLoads(queryLoadDto);
  }

  @Get(':id')
  fetchLoad(@Param('id') id: string) {
    return this.loadsService.fetchLoad(id);
  }

  @Post()
  @Roles(Role.SHIPPER)
  createLoad(@Req() req: Request, @Body() createLoadDto: CreateLoadDto) {
    const userId = (req.user as any).id;
    return this.loadsService.createLoad(userId, createLoadDto);
  }

  @Patch('active/state')
  changeLoadState(@Req() req: Request) {
    return this.loadsService.changeLoadState(req);
  }

  @Put(':id')
  @Roles(Role.SHIPPER)
  updateLoad(@Param('id') id: string, @Body() updateLoadDto: UpdateLoadDto) {
    return this.loadsService.updateLoad(id, updateLoadDto);
  }

  @Delete(':id')
  @Roles(Role.SHIPPER)
  removeLoad(@Param('id') id: string) {
    return this.loadsService.removeLoad(id);
  }
}
