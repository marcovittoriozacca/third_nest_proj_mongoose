import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IsIdValid } from './guard/IsIdValid.guard';
import { IsUserUnique, JwtAuthGuard } from 'src/auth/guard';
import { Request } from 'express';
import { IsTheSameUser } from './guard';
import { User } from 'src/schemas/user.schema';
import { UpdateUser } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<Partial<User[]>> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(IsIdValid, JwtAuthGuard, IsTheSameUser)
  async getUserById(@Param('id') id: string): Promise<Partial<User>> {
    return this.userService.getUserById(id);
  }

  @Patch(':id')
  @UseGuards(IsIdValid, JwtAuthGuard, IsTheSameUser, IsUserUnique)
  async updateUser(
    @Param('id') _id: string,
    @Body() dto: UpdateUser,
  ): Promise<Partial<User>> {
    return this.userService.updateUser(_id, dto);
  }
}
