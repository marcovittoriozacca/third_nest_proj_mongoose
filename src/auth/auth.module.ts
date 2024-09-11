import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { IsUserUnique } from './guard';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [UserModule, JwtModule.register({ global: true })],
  controllers: [AuthController],
  providers: [AuthService, IsUserUnique, JwtStrategy],
})
export class AuthModule {}
