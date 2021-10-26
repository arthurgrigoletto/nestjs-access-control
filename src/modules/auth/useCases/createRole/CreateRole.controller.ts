import { Prisma } from '.prisma/client';
import { JwtAuthGuard } from '@shared/guards/JwtAuth.guard';
import { RolesGuard } from '@shared/guards/Roles.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Is } from '@shared/decorators/Is.decorator';
import { CreateRoleUseCase } from './CreateRole.useCase';
import { Role } from '@config/enums/Role.enum';

@Controller('roles')
export class CreateRoleController {
  constructor(private createRoleUseCase: CreateRoleUseCase) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Is(Role.Admin)
  public async handle(@Body() { name, description }: Prisma.RoleCreateInput) {
    return this.createRoleUseCase.execute({ name, description });
  }
}
