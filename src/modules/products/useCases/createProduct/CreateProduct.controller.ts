import { Prisma } from '.prisma/client';
import { ClaimsGuard } from '@shared/guards/Claims.guard';
import { JwtAuthGuard } from '@shared/guards/JwtAuth.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Can } from '@shared/decorators/Can.decorator';
import { CreateProductUseCase } from './CreateProduct.useCase';
import { Permission } from '@config/enums/Permission.enum';

@Controller('products')
export class CreateProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  @Post()
  @UseGuards(JwtAuthGuard, ClaimsGuard)
  @Can(Permission.CreateProduct)
  public async handle(
    @Body() { description, name, price }: Prisma.ProductCreateInput,
  ) {
    return this.createProductUseCase.execute({ description, name, price });
  }
}
