import { Role, Prisma, Permission } from '@prisma/client';

import { UpdateRoleInput } from '../dtos/UpdateRole.input';

export type RoleInclude = Role & {
  permissions: Permission[];
};

export interface IRoleRepository {
  findByIds(ids: string[]): Promise<Role[]>;
  findById(id: string): Promise<RoleInclude>;
  findByName(name: string): Promise<Role | undefined>;
  create(data: Prisma.RoleCreateInput): Promise<Role>;
  save(role: UpdateRoleInput): Promise<RoleInclude>;
}
