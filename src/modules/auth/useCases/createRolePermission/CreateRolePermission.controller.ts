import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';

import { Role } from '@config/enums/Role.enum';
import { Is } from '@shared/decorators/Is.decorator';
import { ClaimsGuard } from '@shared/guards/Claims.guard';
import { JwtAuthGuard } from '@shared/guards/JwtAuth.guard';

import { CreateRolePermissionUseCase } from './CreateRolePermission.useCase';

interface IRequest {
  permissions: string[];
}

@Controller('roles')
export class CreateRolePermissionController {
  constructor(
    private createRolePermissionUseCase: CreateRolePermissionUseCase,
  ) {}

  @Post('/:roleId')
  @UseGuards(JwtAuthGuard, ClaimsGuard)
  @Is(Role.Admin)
  public async handle(
    @Param('roleId') roleId: string,
    @Body() { permissions }: IRequest,
  ) {
    return this.createRolePermissionUseCase.execute({
      roleId,
      permissions,
    });
  }
}
