import { ROLES_KEY } from '@config/constants/injectKeys.constants';
import { Role } from '@config/enums/Role.enum';
import { UserInclude } from '@modules/users/repositories/UserRepository.interface';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as UserInclude;
    const userRoles = user.roles.map((role) => role.name);

    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
