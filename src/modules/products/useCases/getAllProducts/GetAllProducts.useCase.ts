import { Inject, Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';

import { PRODUCT_REPOSITORY } from '@config/constants/injectKeys.constants';
import { IProductRepository } from '@modules/products/repositories/ProductRepository.interface';

@Injectable()
export class GetAllProductsUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private productRepository: IProductRepository,
  ) {}

  public async execute(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}
