import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/typeOrm/products';
import { Repository } from 'typeorm';
import { ProductsController } from "./products.controller";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products) public productRepo: Repository<Products>,
  ) {}

  async getAllProductsList() {
    return await this.productRepo.find();
  }

  async getAllProductsFullInfomation(): Promise<Products[]> {
    const productsListWithFullInfomation: Products[] = await this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.ProductSizes', 'size')
      .select([
        'product.ProductID',
        'product.ProductName',
        'product.Description',
        'product.CategoryID',
        'product.ImageURL',
        'product.IsActive',
        'size.Size',
        'size.Price',
      ])
      .orderBy('product.ProductID', 'ASC')
      .addOrderBy('size.Size', 'ASC')
      .getMany();

    return productsListWithFullInfomation;
  }

  // Lấy tất cả sản phẩm thuộc category Pizza
  async getAllPizza(): Promise<Products[]> {
    return await this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.ProductSizes', 'size')
      .where('product.CategoryID = :categoryID', { categoryID: 1 }) // CategoryID cho Pizza
      .select([
        'product.ProductID',
        'product.ProductName',
        'product.Description',
        'product.CategoryID',
        'product.ImageURL',
        'product.IsActive',
        'size.Size',
        'size.Price',
      ])
      .orderBy('product.ProductID', 'ASC')
      .addOrderBy('size.Size', 'ASC')
      .getMany();
  }

  // Lấy tất cả sản phẩm thuộc category Hamburger
  async getAllHamburger() {
    return await this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.ProductSizes', 'size')
      .where('product.CategoryID = :categoryID', { categoryID: 2 }) // CategoryID cho Hamburger
      .select([
        'product.ProductID',
        'product.ProductName',
        'product.Description',
        'product.CategoryID',
        'product.ImageURL',
        'product.IsActive',
        'size.Size',
        'size.Price',
      ])
      .orderBy('product.ProductID', 'ASC')
      .addOrderBy('size.Size', 'ASC')
      .getMany();
  }

  // Lấy tất cả sản phẩm thuộc category Drink
  async getAllDrink() {
    return await this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.ProductSizes', 'size')
      .where('product.CategoryID = :categoryID', { categoryID: 3 }) // CategoryID cho Drink
      .select([
        'product.ProductID',
        'product.ProductName',
        'product.Description',
        'product.CategoryID',
        'product.ImageURL',
        'product.IsActive',
        'size.Size',
        'size.Price',
      ])
      .orderBy('product.ProductID', 'ASC')
      .addOrderBy('size.Size', 'ASC')
      .getMany();
  }
}
