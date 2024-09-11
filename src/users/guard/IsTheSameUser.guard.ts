import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Global,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Global()
@Injectable()
export class IsTheSameUser implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const newUserObj = req.user as { id: string; username: string };
    const id = req.params.id;
    const userId = newUserObj.id;
    if (id !== userId) {
      throw new UnauthorizedException(
        'You cant access to this user informations',
      );
    }
    return true;
  }
}
