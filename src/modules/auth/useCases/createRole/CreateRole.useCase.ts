import { Prisma } from '.prisma/client';
import { ROLE_REPOSITORY } from '@config/constants/injectKeys.constants';
import { IRoleRepository } from '@modules/auth/repositories/RoleRepository.interface';
import { ConflictException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY) private roleRepository: IRoleRepository,
  ) {}

  public async execute({ description, name }: Prisma.RoleCreateInput) {
    const roleExists = await this.roleRepository.findByName(name);

    if (roleExists) {
      throw new ConflictException('Role already exists');
    }

    const role = await this.roleRepository.create({ description, name });

    return role;
  }
}
