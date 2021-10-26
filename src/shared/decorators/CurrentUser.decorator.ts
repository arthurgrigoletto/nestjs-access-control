import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

export type CurrentUserType = Omit<User, 'password'>;

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const { user } = request;

    delete user.password;

    return user;
  },
);
