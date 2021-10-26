import { SignInInput } from '@modules/auth/dtos/SignIn.input';
import { Body, Controller, Post } from '@nestjs/common';
import { SignInUseCase } from './SignIn.useCase';

@Controller('login')
export class SignInController {
  constructor(private signInUseCase: SignInUseCase) {}

  @Post()
  public async handle(@Body() { password, username }: SignInInput) {
    return this.signInUseCase.execute({ username, password });
  }
}
