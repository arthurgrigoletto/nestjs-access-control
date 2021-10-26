import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { PERMISSION_KEY } from '@config/constants/injectKeys.constants';
import { Permission } from '@config/enums/Permission.enum';
import { UserInclude } from '@modules/users/repositories/UserRepository.interface';

@Injectable()
export class ClaimsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as UserInclude;
    const userPermissions = user.permissions.map(
      (permissions) => permissions.name,
    );

    return requiredPermissions.some((role) => userPermissions.includes(role));
  }
}
