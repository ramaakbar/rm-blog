import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext) {
    const superCanActivate = await super.canActivate(context);

    if (!superCanActivate) {
      return false;
    }

    const request = context.switchToHttp().getRequest();

    const user = request.user;
    const targetUserId = request.params.id;

    if (user.role === 'admin' || user.id === targetUserId) {
      return true;
    }

    return false;
  }
}
