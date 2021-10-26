import { RoleInclude } from '../repositories/RoleRepository.interface';

export type UpdateRoleInput = Partial<RoleInclude> & {
  id: string;
};
