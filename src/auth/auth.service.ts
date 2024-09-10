import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SignupDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  signup(signupDto: SignupDto) {
    const user = new this.userModel(signupDto);
    user.save();
    return user;
  }

  async signin() {
    return;
  }
}
