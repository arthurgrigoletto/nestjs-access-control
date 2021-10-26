import { Product, Prisma } from '@prisma/client';
import { v4 as uuidV4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../ProductRepository.interface';

@Injectable()
export class InMemoryProductRepository implements IProductRepository {
  private products: Product[] = [];

  public async findAll(): Promise<Product[]> {
    return this.products;
  }

  public async create(data: Prisma.ProductCreateInput): Promise<Product> {
    const now = new Date(Date.now());

    const product: Product = {
      ...data,
      id: uuidV4(),
      createdAt: now,
      updatedAt: now,
    };

    this.products.push(product);

    return product;
  }
}
