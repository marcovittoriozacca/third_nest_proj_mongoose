import {
  Controller,
  Get,
  Param,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IsIdValid } from './guard/IsIdValid.guard';
import { JwtAuthGuard } from 'src/auth/guard';
import { Request } from 'express';
import { IsTheSameUser } from './guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(IsIdValid, JwtAuthGuard, IsTheSameUser)
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
}
