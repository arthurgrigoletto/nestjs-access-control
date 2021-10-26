import {
  PERMISSION_REPOSITORY,
  ROLE_REPOSITORY,
  USER_REPOSITORY,
} from '@config/constants/injectKeys.constants';
import { PermissionRepository } from '@modules/auth/repositories/implementations/Permission.repository';
import { RoleRepository } from '@modules/auth/repositories/implementations/Role.repository';
import { Module } from '@nestjs/common';
import { PrismaService } from '@shared/infra/prisma';
import { HashProviderModule } from '@shared/providers/HashProvider/hashProvider.module';
import { UserRepository } from './repositories/implementations/Users.repository';
import { CreateUserController } from './useCases/createUser/CreateUser.controller';
import { CreateUserUseCase } from './useCases/createUser/CreateUser.useCase';
import { CreateUserAccessControlListController } from './useCases/createUserAccessControlList/CreateUserAccessControlList.controller';
import { CreateUserAccessControlListUseCase } from './useCases/createUserAccessControlList/CreateUserAccessControlList.useCase';

@Module({
  imports: [HashProviderModule],
  controllers: [CreateUserController, CreateUserAccessControlListController],
  providers: [
    PrismaService,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: ROLE_REPOSITORY,
      useClass: RoleRepository,
    },
    {
      provide: PERMISSION_REPOSITORY,
      useClass: PermissionRepository,
    },
    CreateUserUseCase,
    CreateUserAccessControlListUseCase,
  ],
})
export class UsersModule {}
