import { Module } from '@nestjs/common';
import { LoadsService } from './loads.service';
import { LoadsController } from './loads.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Load, LoadSchema } from './schemas/load.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Load.name, schema: LoadSchema }]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET_KEY,
      }),
    }),
  ],
  controllers: [LoadsController],
  providers: [LoadsService],
})
export class LoadsModule {}
