import { Controller, Get } from '@nestjs/common';
import { GetAllProductsUseCase } from './GetAllProducts.useCase';

@Controller('products')
export class GetAllProductsController {
  constructor(private getAllProductsUseCase: GetAllProductsUseCase) {}

  @Get()
  public async handle() {
    return this.getAllProductsUseCase.execute();
  }
}
