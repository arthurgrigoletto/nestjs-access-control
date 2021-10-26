import { User, Prisma, Permission, Role } from '@prisma/client';

import { UpdateUserInput } from '../dtos/UpdateUser.input';

export type UserInclude = User & {
  permissions: Permission[];
  roles: Role[];
};

export interface IUserRepository {
  findById(id: string): Promise<UserInclude | undefined>;
  findByUsername(username: string): Promise<UserInclude | undefined>;
  create(user: Prisma.UserCreateInput): Promise<User>;
  save(user: UpdateUserInput): Promise<UserInclude>;
}
