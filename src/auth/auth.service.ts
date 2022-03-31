import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { RegisterCredentialDto } from './dto/registerCredential.dto';
import { CredentialDto } from './dto/credential.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async login(credential: CredentialDto) {
    const user = await this.userModel.findOne({
      email: credential.email,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email and/or password');
    }

    const isValidPassword = await bcrypt.compare(
      credential.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid email and/or password');
    }

    const payload = { id: user.id, email: user.email, role: user.role };

    return { jwt_token: this.jwtService.sign(payload) };
  }

  async register(registerCredential: RegisterCredentialDto): Promise<any> {
    const userExists = await this.userModel.findOne({
      email: registerCredential.email,
    });

    if (userExists) {
      throw new UnprocessableEntityException('Email already exists');
    }

    registerCredential.password = await bcrypt.hash(
      registerCredential.password,
      saltOrRounds,
    );
    const newUser = new this.userModel(registerCredential);
    await newUser.save();
    return { message: 'Profile created successfully' };
  }
}
