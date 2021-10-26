import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Role } from '@config/enums/Role.enum';
import { Is } from '@shared/decorators/Is.decorator';
import { ClaimsGuard } from '@shared/guards/Claims.guard';
import { JwtAuthGuard } from '@shared/guards/JwtAuth.guard';

import { CreatePermissionUseCase } from './CreatePermission.useCase';

@Controller('permissions')
export class CreatePermissionController {
  constructor(private createPermissionUseCase: CreatePermissionUseCase) {}

  @Post()
  @UseGuards(JwtAuthGuard, ClaimsGuard)
  @Is(Role.Admin)
  public async handle(@Body() { name, description }: Prisma.RoleCreateInput) {
    return this.createPermissionUseCase.execute({ name, description });
  }
}
