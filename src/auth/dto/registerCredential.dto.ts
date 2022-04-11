import { ApiProperty } from '@nestjs/swagger';
import { CredentialDto } from './credential.dto';

enum Role {
  DRIVER = 'DRIVER',
  SHIPPER = 'SHIPPER',
}

export class RegisterCredentialDto extends CredentialDto {
  @ApiProperty()
  role: Role;
}
