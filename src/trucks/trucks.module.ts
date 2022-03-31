import { Module } from '@nestjs/common';
import { TrucksService } from './trucks.service';
import { TrucksController } from './trucks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Truck, TruckSchema } from './schemas/truck.schema';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Truck.name, schema: TruckSchema },
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET_KEY,
      }),
    }),
  ],
  controllers: [TrucksController],
  providers: [TrucksService],
})
export class TrucksModule {}
