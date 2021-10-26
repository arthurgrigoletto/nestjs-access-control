import { PERMISSION_KEY } from '@config/constants/injectKeys.constants';
import { Permission } from '@config/enums/Permission.enum';
import { SetMetadata } from '@nestjs/common';

export const Can = (...permissions: Permission[]) =>
  SetMetadata(PERMISSION_KEY, permissions);
