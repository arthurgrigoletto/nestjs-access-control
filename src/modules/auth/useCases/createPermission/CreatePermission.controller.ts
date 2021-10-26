import { Prisma } from '.prisma/client';
import { JwtAuthGuard } from '@shared/guards/JwtAuth.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreatePermissionUseCase } from './CreatePermission.useCase';

@Controller('permissions')
export class CreatePermissionController {
  constructor(private createPermissionUseCase: CreatePermissionUseCase) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  public async handle(@Body() { name, description }: Prisma.RoleCreateInput) {
    return this.createPermissionUseCase.execute({ name, description });
  }
}
