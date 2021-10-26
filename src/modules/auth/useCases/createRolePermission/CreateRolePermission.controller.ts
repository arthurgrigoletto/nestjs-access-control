import { Body, Controller, Param, Post } from '@nestjs/common';
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
