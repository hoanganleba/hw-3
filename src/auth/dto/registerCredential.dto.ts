import { ApiProperty } from '@nestjs/swagger';

enum Role {
  DRIVER = 'DRIVER',
  SHIPPER = 'SHIPPER',
}

export class RegisterCredentialDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  role: Role;
}
