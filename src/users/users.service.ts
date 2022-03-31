import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async getProfile(req: Request) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const data: any = this.jwtService.decode(token);
    const user = await this.userModel.findById(data.id, { password: 0 });
    return { user };
  }

  async changePassword(
    req: Request,
    changeUserPasswordDto: ChangeUserPasswordDto,
  ) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const data: any = this.jwtService.decode(token);
    const user = await this.userModel.findById(data.id);
    const isValidPassword = await bcrypt.compare(
      changeUserPasswordDto.oldPassword,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password');
    } else {
      const newHashPassword = await bcrypt.hash(
        changeUserPasswordDto.newPassword,
        saltOrRounds,
      );

      await this.userModel.findByIdAndUpdate(data.id, {
        password: newHashPassword,
      });

      return { message: 'Password changed successfully' };
    }
  }

  async deleteProfile(req: Request) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const data: any = this.jwtService.decode(token);
    const user = await this.userModel.findById(data.id);
    await this.userModel.findByIdAndRemove(user.id);

    return {
      message: 'Profile deleted successfully',
    };
  }
}
