import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Global,
  Injectable,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Global()
@Injectable()
export class IsIdValid implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const { id } = req.params;
    const isValid = isValidObjectId(id);
    if (!isValid) {
      throw new BadRequestException(`${id} is an invalid ObjectId`);
    }
    return true;
  }
}
