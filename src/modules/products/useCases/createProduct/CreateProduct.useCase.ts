import { Inject, Injectable } from '@nestjs/common';
import { Product, Prisma } from '@prisma/client';

import { PRODUCT_REPOSITORY } from '@config/constants/injectKeys.constants';
import { IProductRepository } from '@modules/products/repositories/ProductRepository.interface';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private productRepository: IProductRepository,
  ) {}

  public async execute({
    description,
    price,
    name,
  }: Prisma.ProductCreateInput): Promise<Product> {
    return this.productRepository.create({ description, name, price });
  }
}
