import { Product, Prisma } from '@prisma/client';

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  create(product: Prisma.ProductCreateInput): Promise<Product>;
}
