import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { SignupDto } from '../dto';

@Injectable()
export class IsUserUnique implements CanActivate {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const dto: SignupDto = request.body;
    const { username, email } = dto;

    const matchEmail = await this.userModel.findOne({ email });
    if (matchEmail) {
      throw new BadRequestException(`${email} already exist`);
    }

    const matchUsername = await this.userModel.findOne({ username });
    if (matchUsername) {
      throw new BadRequestException(`${username} already exist`);
    }

    return true;
  }
}
