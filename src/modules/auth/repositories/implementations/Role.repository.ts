import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';

import { UpdateRoleInput } from '@modules/auth/dtos/UpdateRole.input';
import { PrismaService } from '@shared/infra/prisma';

import { IRoleRepository, RoleInclude } from '../RoleRepository.interface';

@Injectable()
export class RoleRepository implements IRoleRepository {
  constructor(private prisma: PrismaService) {}

  public async findByIds(ids: string[]): Promise<Role[]> {
    return this.prisma.role.findMany({ where: { id: { in: ids } } });
  }

  public async findById(id: string): Promise<RoleInclude> {
    return this.prisma.role.findUnique({
      where: { id },
      include: { permissions: true },
    });
  }

  public async findByName(name: string): Promise<Role | undefined> {
    return this.prisma.role.findFirst({ where: { name } });
  }

  public async create({
    name,
    description,
  }: Prisma.RoleCreateInput): Promise<Role> {
    return this.prisma.role.create({ data: { name, description } });
  }

  public async save(role: UpdateRoleInput): Promise<RoleInclude> {
    return this.prisma.role.update({
      where: { id: role.id },
      data: {
        ...role,
        permissions: {
          connect: role.permissions.map((permission) => ({
            id: permission.id,
          })),
        },
      },
      include: {
        permissions: true,
      },
    });
  }
}
