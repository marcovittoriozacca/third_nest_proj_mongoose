import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto';
import { IsUserUnique } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UseGuards(IsUserUnique)
  async signup(
    @Body() signupDto: SignupDto,
  ): Promise<{ access_token: string }> {
    return this.authService.signup(signupDto);
  }

  @Post('signin')
  async signin(
    @Body() signinDto: SigninDto,
  ): Promise<{ access_token: string } | void> {
    return this.authService.signin(signinDto);
  }
}
