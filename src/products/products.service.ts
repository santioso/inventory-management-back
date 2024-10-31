import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async createProduct(name: string, quantity: number, expirationDate: Date) {
    if (quantity < 0) {
      throw new HttpException('Quantity must be non-negative', HttpStatus.BAD_REQUEST);
    }
    if (new Date(expirationDate) < new Date()) {
      throw new HttpException('Expiration date must be in the future', HttpStatus.BAD_REQUEST);
    }

    const product = new Product();
    product.name = name;
    product.quantity = quantity;
    product.expirationDate = expirationDate;
    product.status = this.getStatus(expirationDate);
    return this.productsRepository.save(product);
  }

  async getAllProducts() {
    const products = await this.productsRepository.find();
    products.forEach(product => {
      product.status = this.getStatus(product.expirationDate);
    });
    return products;
  }

  async getProductById(id: number) {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    product.status = this.getStatus(product.expirationDate);
    return product;
  }

  async updateProductQuantity(id: number, quantity: number) {
    const product = await this.getProductById(id);
    if (product.quantity + quantity < 0) {
      throw new HttpException('Resulting quantity must be non-negative', HttpStatus.BAD_REQUEST);
    }
    product.quantity += quantity;
    return this.productsRepository.save(product);
  }

  async searchProductsByName(name: string) {
    const products = await this.productsRepository.find({ where: { name: Like(`%${name}%`) } });
    products.forEach(product => {
      product.status = this.getStatus(product.expirationDate);
    });
    return products;
  }

  private getStatus(expirationDate: Date): string {
    const currentDate = new Date();
    const daysUntilExpiration = Math.ceil(
      (new Date(expirationDate).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (daysUntilExpiration < 0) return 'vencido';
    else if (daysUntilExpiration <= 3) return 'por vencer';
    return 'vigente';
  }
}