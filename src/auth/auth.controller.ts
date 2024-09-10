import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() signupDto: SignupDto,
  ): Promise<{ access_token: string }> {
    return this.authService.signup(signupDto);
  }
  @Post('signin')
  async signin() {}
}
