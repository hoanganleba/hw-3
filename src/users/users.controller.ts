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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';

@ApiTags('User')
@Controller('users/me')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getProfile(@Req() req: Request) {
    const userId = (req.user as any).id;
    return this.usersService.getProfile(userId);
  }

  @Patch('password')
  changePassword(
    @Req() req: Request,
    @Body() changeUserPasswordDto: ChangeUserPasswordDto,
  ) {
    const userId = (req.user as any).id;
    return this.usersService.changePassword(userId, changeUserPasswordDto);
  }

  @Delete()
  deleteProfile(@Req() req: Request) {
    const userId = (req.user as any).id;
    return this.usersService.deleteProfile(userId);
  }
}
