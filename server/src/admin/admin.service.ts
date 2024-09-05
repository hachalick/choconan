import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryProductMenuEntity } from 'src/modules/entity/mysql/Category-Product.entity';
import { ProductMenuEntity } from 'src/modules/entity/mysql/Product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(CategoryProductMenuEntity)
    private readonly categoryProductMenuRepository: Repository<CategoryProductMenuEntity>,
    @InjectRepository(ProductMenuEntity)
    private readonly productMenuRepository: Repository<ProductMenuEntity>,
  ) {}


}
