import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import {
  PERMISSION_REPOSITORY,
  ROLE_REPOSITORY,
} from '@config/constants/injectKeys.constants';
import { CreateRolePermissionInput } from '@modules/auth/dtos/CreateRolePermission.input';
import { IPermissionRepository } from '@modules/auth/repositories/PermissionRepository.interface';
import {
  IRoleRepository,
  RoleInclude,
} from '@modules/auth/repositories/RoleRepository.interface';

@Injectable()
export class CreateRolePermissionUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY) private roleRepository: IRoleRepository,
    @Inject(PERMISSION_REPOSITORY)
    private permissionRepository: IPermissionRepository,
  ) {}

  public async execute({
    permissions,
    roleId,
  }: CreateRolePermissionInput): Promise<RoleInclude> {
    const role = await this.roleRepository.findById(roleId);

    if (!role) {
      throw new NotFoundException('Role not exists');
    }

    const permissionsExists = await this.permissionRepository.findByIds(
      permissions,
    );

    role.permissions = permissionsExists;

    await this.roleRepository.save(role);

    return role;
  }
}
