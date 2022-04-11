import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getProfile(userId: any) {
    const user = await this.userModel.findById(userId, { password: 0 });
    return { user };
  }

  async changePassword(
    userId: any,
    changeUserPasswordDto: ChangeUserPasswordDto,
  ) {
    const user = await this.userModel.findById(userId);
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

      await this.userModel.findByIdAndUpdate(userId, {
        password: newHashPassword,
      });

      return { message: 'Password changed successfully' };
    }
  }

  async deleteProfile(userId: any) {
    await this.userModel.findByIdAndRemove(userId);

    return {
      message: 'Profile deleted successfully',
    };
  }
}
