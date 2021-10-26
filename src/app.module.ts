import { AuthModule } from '@modules/auth/auth.module';
import { ProductsModule } from '@modules/products/products.module';
import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule, UsersModule, ProductsModule],
})
export class AppModule {}
