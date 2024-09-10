import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('users')
export class UserController{
    constructor(private userService: UserService){}

    @Get()
    async getAllUsers(){
        return await this.userService.getAllUsers();
    }
}