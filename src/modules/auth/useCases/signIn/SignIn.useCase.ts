import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  HASH_PROVIDER,
  USER_REPOSITORY,
} from '@config/constants/injectKeys.constants';
import { IUserRepository } from '@modules/users/repositories/UserRepository.interface';
import { IHashProvider } from '@shared/providers/HashProvider/models/hashProvider.interface';
import { SIGN_IN_ERROR } from '@config/constants/erros.constants';
import { SignInInput } from '@modules/auth/dtos/SignIn.input';

type SignInOutput = {
  token: string;
};

@Injectable()
export class SignInUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: IUserRepository,
    @Inject(HASH_PROVIDER) private hashProvider: IHashProvider,
    private jwtService: JwtService,
  ) {}

  public async execute({
    password,
    username,
  }: SignInInput): Promise<SignInOutput> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException(SIGN_IN_ERROR);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new UnauthorizedException(SIGN_IN_ERROR);
    }

    const token = await this.jwtService.signAsync({ sub: user.id });

    return { token };
  }
}
