import { Controller, Get, Post, Patch, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  async createProduct(@Body() productData: { name: string; quantity: number; expirationDate: Date }) {
    return this.productsService.createProduct(productData.name, productData.quantity, productData.expirationDate);
  }

  @Get()
  async getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    return this.productsService.getProductById(id);
  }

  @Patch(':id/update-quantity')
  async addProductQuantity(@Param('id') id: number, @Body() body: { quantity: number }) {
    return this.productsService.updateProductQuantity(id, body.quantity);
  }

  @Patch(':id/exit')
  async subtractProductQuantity(@Param('id') id: number, @Body() body: { quantity: number }) {
    return this.productsService.updateProductQuantity(id, -body.quantity);
  }

  @Get('search/:name')
  async searchProductsByName(@Param('name') name: string) {
    return this.productsService.searchProductsByName(name);
  }
}