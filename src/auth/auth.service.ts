import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SigninDto, SignupDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
    private jwt: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<{ access_token: string }> {
    try {
      const user = new this.userModel(signupDto);
      user.password = await argon.hash(
        user.password + this.config.get('PEPPER_KEY'),
      );
      await user.save();
      const access_token = await this.signToken({
        sub: user.id,
        username: user.username,
      });

      return { access_token };
    } catch (err) {
      if (err.code === 11000) {
        const field = Object.keys(err.errorResponse.keyPattern)[0];
        const value = err.keyValue[field];
        throw new BadRequestException(
          `This ${field}: ${value} is already taken`,
        );
      }
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async signin(signinDto: SigninDto): Promise<{ access_token: string }> {
    try {
      const { email, password } = signinDto;
      const user = await this.userModel.findOne({ email });

      if (!user) {
        throw new NotFoundException('Invalid Email');
      }

      const isPasswordCorrect = await argon.verify(
        user.password,
        signinDto.password + this.config.get('PEPPER_KEY'),
      );

      if (!isPasswordCorrect) {
        throw new BadRequestException('Email or password invalid');
      }

      const access_token = await this.signToken({
        sub: user.id,
        username: user.username,
      });
      return { access_token };
    } catch (err) {
      throw err;
    }
  }

  async signToken(payload: { sub: string; username: string }): Promise<string> {
    return await this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: '1d',
    });
  }
}
