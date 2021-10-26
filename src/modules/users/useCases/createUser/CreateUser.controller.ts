import { Prisma } from '.prisma/client';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from './CreateUser.useCase';

@Controller('users')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  public async handle(@Body() { password, username }: Prisma.UserCreateInput) {
    return this.createUserUseCase.execute({ password, username });
  }
}
