import { JwtAuthGuard } from '@shared/guards/JwtAuth.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  CurrentUser,
  CurrentUserType,
} from '@shared/decorators/CurrentUser.decorator';
import { CreateUserAccessControlListUseCase } from './CreateUserAccessControlList.useCase';

interface IRequest {
  permissions: string[];
  roles: string[];
}

@Controller('users/acl')
export class CreateUserAccessControlListController {
  constructor(
    private createUserAccessControlListUseCase: CreateUserAccessControlListUseCase,
  ) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  public async handle(
    @CurrentUser() user: CurrentUserType,
    @Body() { permissions, roles }: IRequest,
  ) {
    return this.createUserAccessControlListUseCase.execute({
      permissions,
      roles,
      userId: user.id,
    });
  }
}
