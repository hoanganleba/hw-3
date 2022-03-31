import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';

@ApiTags('User')
@Controller('users/me')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getProfile(@Req() req: Request) {
    return this.usersService.getProfile(req);
  }

  @Patch('password')
  changePassword(
    @Req() req: Request,
    @Body() changeUserPasswordDto: ChangeUserPasswordDto,
  ) {
    return this.usersService.changePassword(req, changeUserPasswordDto);
  }

  @Delete()
  deleteProfile(@Req() req: Request) {
    return this.usersService.deleteProfile(req);
  }
}
