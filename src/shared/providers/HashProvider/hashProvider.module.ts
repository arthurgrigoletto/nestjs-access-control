import { Module } from '@nestjs/common';

import { HASH_PROVIDER } from '@config/constants/injectKeys.constants';

import BCryptHashProvider from './implementations/BCryptHash.provider';

@Module({
  providers: [
    {
      provide: HASH_PROVIDER,
      useClass: BCryptHashProvider,
    },
  ],
  exports: [HASH_PROVIDER],
})
export class HashProviderModule {}
