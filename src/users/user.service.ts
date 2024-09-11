import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { UpdateUser } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.userModel.find().select(['-password', '-email']);
      return users;
    } catch (err) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async getUserById(id: string): Promise<Partial<User>> {
    try {
      const user = await this.userModel.findById(id).select('-password');
      if (!user) {
        throw new NotFoundException(`The user with id: ${id} doesnt exist`);
      }
      return user;
    } catch (err) {
      throw err;
    }
  }

  async updateUser(_id: string, dto: UpdateUser): Promise<Partial<User>> {
    try {
      const updatedUser = this.userModel
        .findOneAndUpdate({ _id }, dto, {
          new: true,
        })
        .select('-password');
      return updatedUser;
    } catch (err) {
      throw err;
    }
  }
}
