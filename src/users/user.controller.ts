import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { IsIdValid } from './guard/IsIdValid.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(IsIdValid)
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
}
