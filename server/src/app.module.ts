import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './typeOrm/users';
import { Products } from './typeOrm/products';
import { Categories } from './typeOrm/categories';
import { ProductSizes } from './typeOrm/productSizes';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3309,
      username: 'root',
      password: 'nguyenvu',
      database: 'fastfoodorder_v2',
      entities: [Users, Products, Categories, ProductSizes],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
