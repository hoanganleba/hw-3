import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CredentialDto } from './dto/credential.dto';
import { RegisterCredentialDto } from './dto/registerCredential.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() credential: CredentialDto) {
    return this.authService.login(credential);
  }

  @Post('/register')
  register(@Body() registerCredential: RegisterCredentialDto) {
    return this.authService.register(registerCredential);
  }
}
