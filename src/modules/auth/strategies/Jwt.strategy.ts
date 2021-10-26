import { USER_REPOSITORY } from '@config/constants/injectKeys.constants';
import { IUserRepository } from '@modules/users/repositories/UserRepository.interface';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import authConfig from '@config/auth';
import { User } from '@prisma/client';

interface IPayload {
  sub: User['id'];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: IUserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.jwt.secret,
    });
  }

  public async validate({ sub }: IPayload) {
    const user = await this.userRepository.findById(sub);

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    return user;
  }
}
