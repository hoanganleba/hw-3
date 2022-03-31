import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoadsModule } from './loads/loads.module';
import { UsersModule } from './users/users.module';
import { TrucksModule } from './trucks/trucks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    LoadsModule,
    UsersModule,
    TrucksModule,
  ],
})
export class AppModule {}
