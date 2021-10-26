import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PERMISSION_REPOSITORY } from '@config/constants/injectKeys.constants';
import { IPermissionRepository } from '@modules/auth/repositories/PermissionRepository.interface';

@Injectable()
export class CreatePermissionUseCase {
  constructor(
    @Inject(PERMISSION_REPOSITORY)
    private permissionRepository: IPermissionRepository,
  ) {}

  public async execute({ description, name }: Prisma.RoleCreateInput) {
    const permissionExists = await this.permissionRepository.findByName(name);

    if (permissionExists) {
      throw new ConflictException('Permission already exists');
    }

    const permission = await this.permissionRepository.create({
      description,
      name,
    });

    return permission;
  }
}
