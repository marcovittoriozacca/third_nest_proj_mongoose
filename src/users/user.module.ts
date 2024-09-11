import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { IsIdValid, IsTheSameUser } from './guard';
import { IsUserUnique } from 'src/auth/guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, IsIdValid, IsTheSameUser, IsUserUnique],
  exports: [MongooseModule, IsIdValid],
})
export class UserModule {}
