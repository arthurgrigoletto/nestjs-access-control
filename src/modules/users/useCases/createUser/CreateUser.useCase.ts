import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';

import { USER_EXISTS } from '@config/constants/erros.constants';
import {
  HASH_PROVIDER,
  USER_REPOSITORY,
} from '@config/constants/injectKeys.constants';
import { IUserRepository } from '@modules/users/repositories/UserRepository.interface';
import { IHashProvider } from '@shared/providers/HashProvider/models/hashProvider.interface';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: IUserRepository,
    @Inject(HASH_PROVIDER) private hashProvider: IHashProvider,
  ) {}

  public async execute({
    username,
    password,
  }: Prisma.UserCreateInput): Promise<User> {
    const userExists = await this.userRepository.findByUsername(username);

    if (userExists) {
      throw new ConflictException(USER_EXISTS);
    }

    const passwordHash = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      username,
      password: passwordHash,
    });

    return user;
  }
}
