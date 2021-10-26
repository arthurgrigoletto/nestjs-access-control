import { Prisma, Permission } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infra/prisma';
import { IPermissionRepository } from '../PermissionRepository.interface';

@Injectable()
export class PermissionRepository implements IPermissionRepository {
  constructor(private prisma: PrismaService) {}

  public async findByIds(ids: string[]): Promise<Permission[]> {
    return this.prisma.permission.findMany({ where: { id: { in: ids } } });
  }

  public async findByName(name: string): Promise<Permission | undefined> {
    return this.prisma.permission.findFirst({ where: { name } });
  }

  public async create({
    name,
    description,
  }: Prisma.PermissionCreateInput): Promise<Permission> {
    return this.prisma.permission.create({ data: { name, description } });
  }
}
