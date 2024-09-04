import { Injectable } from '@nestjs/common';
import { PresentOrderTableEntity } from '../entity/mysql/Present-Order-Table.entity';
import { FactorPresentOrderEntity } from '../entity/mysql/Factor-Present-Order.entity';
import { ProductMenuEntity } from '../entity/mysql/Product.entity';
import { CategoryProductMenuEntity } from '../entity/mysql/Category-Product.entity';
import { BlogEntity } from './../entity/mysql/Blog.entity';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { UserEntity } from '../entity/mysql/User.entity';
import { RoleEntity } from '../entity/mysql/Role.entity';
import { RoleUserEntity } from '../entity/mysql/RoleUser.entity';

@Injectable()
export class TypeOrmDbConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(
    connectionName?: string,
  ): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'mysql',
      port: this.configService.get('Db.port'),
      host: this.configService.get('Db.host'),
      username: this.configService.get('Db.username'),
      password: this.configService.get('Db.password'),
      database: this.configService.get('Db.database'),
      synchronize: true,
      entities: [
        BlogEntity,
        CategoryProductMenuEntity,
        FactorPresentOrderEntity,
        PresentOrderTableEntity,
        ProductMenuEntity,
        RoleEntity,
        RoleUserEntity,
        UserEntity,
      ],
    };
  }
}
