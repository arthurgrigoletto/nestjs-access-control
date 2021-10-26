import {
  PERMISSION_REPOSITORY,
  ROLE_REPOSITORY,
  USER_REPOSITORY,
} from '@config/constants/injectKeys.constants';
import { IPermissionRepository } from '@modules/auth/repositories/PermissionRepository.interface';
import { IRoleRepository } from '@modules/auth/repositories/RoleRepository.interface';
import { CreateUserAccessControlListInput } from '@modules/users/dtos/CreateUserAccessControlList.input';
import {
  IUserRepository,
  UserInclude,
} from '@modules/users/repositories/UserRepository.interface';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CreateUserAccessControlListUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: IUserRepository,
    @Inject(ROLE_REPOSITORY)
    private roleRepository: IRoleRepository,
    @Inject(PERMISSION_REPOSITORY)
    private permissionRepository: IPermissionRepository,
  ) {}

  public async execute({
    permissions,
    roles,
    userId,
  }: CreateUserAccessControlListInput): Promise<UserInclude> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User does not exists');
    }

    const permissionsExists = await this.permissionRepository.findByIds(
      permissions,
    );
    const rolesExists = await this.roleRepository.findByIds(roles);

    user.permissions = permissionsExists;
    user.roles = rolesExists;

    await this.userRepository.save(user);

    return user;
  }
}
