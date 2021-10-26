import { SetMetadata } from '@nestjs/common';

import { ROLES_KEY } from '@config/constants/injectKeys.constants';
import { Role } from '@config/enums/Role.enum';

export const Is = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
