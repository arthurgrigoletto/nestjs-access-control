import { Permission, Prisma } from '@prisma/client';

export interface IPermissionRepository {
  findByIds(ids: string[]): Promise<Permission[]>;
  findByName(name: string): Promise<Permission | undefined>;
  create(data: Prisma.PermissionCreateInput): Promise<Permission>;
}
