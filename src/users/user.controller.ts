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

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(IsIdValid, JwtAuthGuard)
  async getUserById(@Param('id') id: string, @Req() req: Request) {
    const newUserObj = req.user as { id: string; username: string };
    const userId = newUserObj.id;
    if (id !== userId) {
      throw new UnauthorizedException(
        'You cant access to this user informations',
      );
    }

    return this.userService.getUserById(id);
  }
}
