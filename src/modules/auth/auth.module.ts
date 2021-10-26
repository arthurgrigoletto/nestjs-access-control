import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import authConfig from '@config/auth';
import {
  PERMISSION_REPOSITORY,
  ROLE_REPOSITORY,
  USER_REPOSITORY,
} from '@config/constants/injectKeys.constants';
import { UserRepository } from '@modules/users/repositories/implementations/Users.repository';
import { PrismaService } from '@shared/infra/prisma';
import { HashProviderModule } from '@shared/providers/HashProvider/hashProvider.module';

import { PermissionRepository } from './repositories/implementations/Permission.repository';
import { RoleRepository } from './repositories/implementations/Role.repository';
import { JwtStrategy } from './strategies/Jwt.strategy';
import { CreatePermissionController } from './useCases/createPermission/CreatePermission.controller';
import { CreatePermissionUseCase } from './useCases/createPermission/CreatePermission.useCase';
import { CreateRoleController } from './useCases/createRole/CreateRole.controller';
import { CreateRoleUseCase } from './useCases/createRole/CreateRole.useCase';
import { CreateRolePermissionController } from './useCases/createRolePermission/CreateRolePermission.controller';
import { CreateRolePermissionUseCase } from './useCases/createRolePermission/CreateRolePermission.useCase';
import { SignInController } from './useCases/signIn/SignIn.controller';
import { SignInUseCase } from './useCases/signIn/SignIn.useCase';

@Module({
  imports: [
    JwtModule.register({
      secret: authConfig.jwt.secret,
      signOptions: { expiresIn: authConfig.jwt.expiresIn },
    }),
    HashProviderModule,
  ],
  controllers: [
    SignInController,
    CreateRoleController,
    CreatePermissionController,
    CreateRolePermissionController,
  ],
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
    SignInUseCase,
    CreateRoleUseCase,
    CreatePermissionUseCase,
    CreateRolePermissionUseCase,
    JwtStrategy,
  ],
})
export class AuthModule {}
