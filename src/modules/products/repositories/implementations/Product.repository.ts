import { Product, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infra/prisma';
import { IProductRepository } from '../ProductRepository.interface';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private prisma: PrismaService) {}

  public async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  public async create({
    description,
    name,
    price,
  }: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({ data: { description, name, price } });
  }
}
