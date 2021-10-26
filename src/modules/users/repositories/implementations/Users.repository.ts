import { User, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infra/prisma';
import { IUserRepository, UserInclude } from '../UserRepository.interface';
import { UpdateUserInput } from '@modules/users/dtos/UpdateUser.input';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  public async findById(id: string): Promise<UserInclude | undefined> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        permissions: true,
        roles: true,
      },
    });
  }

  public async findByUsername(
    username: string,
  ): Promise<UserInclude | undefined> {
    return this.prisma.user.findFirst({
      where: { username },
      include: {
        roles: true,
        permissions: true,
      },
    });
  }

  public async create({
    password,
    username,
  }: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data: { password, username } });
  }

  public async save(user: UpdateUserInput): Promise<UserInclude> {
    return this.prisma.user.update({
      data: {
        ...user,
        permissions: {
          connect: user.permissions.map((permission) => ({
            id: permission.id,
          })),
        },
        roles: {
          connect: user.roles.map((role) => ({
            id: role.id,
          })),
        },
      },
      where: { id: user.id },
      include: {
        permissions: true,
        roles: true,
      },
    });
  }
}
