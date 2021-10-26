import { PRODUCT_REPOSITORY } from '@config/constants/injectKeys.constants';
import { Module } from '@nestjs/common';
import { PrismaService } from '@shared/infra/prisma';
import { ProductRepository } from './repositories/implementations/Product.repository';
import { CreateProductController } from './useCases/createProduct/CreateProduct.controller';
import { CreateProductUseCase } from './useCases/createProduct/CreateProduct.useCase';
import { GetAllProductsController } from './useCases/getAllProducts/GetAllProducts.controller';
import { GetAllProductsUseCase } from './useCases/getAllProducts/GetAllProducts.useCase';

@Module({
  controllers: [GetAllProductsController, CreateProductController],
  providers: [
    PrismaService,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepository,
    },
    GetAllProductsUseCase,
    CreateProductUseCase,
  ],
})
export class ProductsModule {}
