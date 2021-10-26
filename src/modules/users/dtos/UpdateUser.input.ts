import { UserInclude } from '../repositories/UserRepository.interface';

export type UpdateUserInput = Partial<UserInclude> & {
  id: string;
};
