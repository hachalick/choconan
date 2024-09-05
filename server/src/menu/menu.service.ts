import { Injectable } from '@nestjs/common';
import { FactorPresentOrderEntity } from '../modules/entity/mysql/Factor-Present-Order.entity';
import { CategoryProductMenuEntity } from '../modules/entity/mysql/Category-Product.entity';
import { ProductMenuEntity } from '../modules/entity/mysql/Product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { utils as utilsExcel, read as readExcel } from 'xlsx';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(CategoryProductMenuEntity)
    private readonly categoryProductMenuRepository: Repository<CategoryProductMenuEntity>,
    @InjectRepository(ProductMenuEntity)
    private readonly productMenuRepository: Repository<ProductMenuEntity>,
  ) {}

  async getAllMenu() {
    return await this.categoryProductMenuRepository.find({
      relations: { products: true },
      order: { products: { id: 'ASC' }, category: 'ASC' },
    });
  }

  async getCategoryMenu({ category }: { category: string }) {
    return await this.categoryProductMenuRepository.findOne({
      relations: { products: true },
      where: { category },
      order: { products: { id: 'ASC' }, category: 'ASC' },
    });
  }

  async getOneProductMenu({
    category,
    id,
  }: {
    category: string;
    id: number;
  }): Promise<TIdProductMenu> {
    const res = await this.categoryProductMenuRepository.findOne({
      relations: { products: true },
      where: { category, products: [{ id }] },
      order: { products: { id: 'ASC' }, category: 'ASC' },
    });
    return res.products.pop();
  }

  async searchProductMenu({
    query,
    weight_meta_title = 1.5,
    weight_meta_description = 1.1,
    weight_name = 1.3,
    weight_description = 1,
  }: {
    query: string;
    weight_meta_title?: number;
    weight_meta_description?: number;
    weight_name?: number;
    weight_description?: number;
  }) {
    const allProductMenu = await this.productMenuRepository.find({
      relations: { categoryProductMenu: true },
    });
    const listSearch: TIdProductsSearchMenu = [];
    for (let i in allProductMenu) {
      const {
        available,
        description,
        id,
        meta_description,
        meta_title,
        name,
        price,
        product_id,
        src,
        waiting,
        categoryProductMenu,
      } = allProductMenu[i];
      const weight_product = {
        meta_title: 0,
        meta_description: 0,
        name: 0,
        description: 0,
      };
      weight_product['meta_title'] = meta_title
        ? [...meta_title.matchAll(new RegExp(`.*${query}.*`, 'g'))].length *
          weight_meta_title
        : 0;
      weight_product['meta_description'] = meta_description
        ? [...meta_description.matchAll(new RegExp(`.*${query}.*`, 'g'))]
            .length * weight_meta_description
        : 0;
      weight_product['name'] = name
        ? [...name.matchAll(new RegExp(`.*${query}.*`, 'g'))].length *
          weight_name
        : 0;
      weight_product['description'] = description
        ? [...description.matchAll(new RegExp(`.*${query}.*`, 'g'))].length *
          weight_description
        : 0;
      const rank =
        weight_product.description +
        weight_product.meta_description +
        weight_product.meta_title +
        weight_product.name;
      rank &&
        listSearch.push({
          rank,
          available,
          description,
          id,
          meta_description,
          meta_title,
          name,
          price,
          product_id,
          src,
          waiting,
          category: categoryProductMenu.category,
        });
    }
    listSearch.sort((a, b) => b.rank - a.rank);
    return listSearch;
  }

  async uploadFileExcel({ file }: { file: Express.Multer.File }) {
    const allMenu: TCategoriesMenu = [];
    const workbook = readExcel(file.buffer, { type: 'buffer' });
    const sheet_name_list = workbook.SheetNames;
    for (let i = 0; i < sheet_name_list.length; i++) {
      const data: TProductsMenu = utilsExcel.sheet_to_json(
        workbook.Sheets[sheet_name_list[i]],
        {
          blankrows: true,
          defval: null,
        },
      );
      allMenu.push({
        category: sheet_name_list[i],
        icon: '/default.jpg',
        products: data,
      });
    }
    const pastCategory = await this.categoryProductMenuRepository.find();
    for (let i in pastCategory) {
      await this.categoryProductMenuRepository.delete({
        category_product_id: pastCategory[i].category_product_id,
      });
    }
    for (let i in allMenu) {
      const { category_id } = await this.addCategoryMenu({
        category: allMenu[i].category,
        icon: allMenu[i].icon,
      });
      for (let j in allMenu[i].products) {
        const {
          available,
          description,
          id,
          meta_description,
          meta_title,
          name,
          price,
          src,
          waiting,
        } = allMenu[i].products[j];
        await this.addProductMenu({
          available,
          description,
          id,
          meta_description,
          meta_title,
          name,
          category_id,
          price,
          src,
          waiting,
        });
      }
    }
    return { change: true };
  }

  async addCategoryMenu({
    category,
    icon,
  }: {
    category: string;
    icon: string;
  }) {
    const newCategory = this.categoryProductMenuRepository.create({
      category,
      icon,
    });
    const res = await this.categoryProductMenuRepository.save(newCategory);
    return { add: true, category_id: res.category_product_id };
  }

  async updateCategoryMenu({
    category_id,
    category,
    icon,
  }: {
    category_id: string;
    category: string;
    icon: string;
  }) {
    await this.categoryProductMenuRepository.update(
      { category_product_id: category_id },
      { category, icon },
    );
    return { update: true };
  }

  async deleteCategoryMenu({ category_id }: { category_id: string }) {
    const data = await this.categoryProductMenuRepository.delete({
      category_product_id: category_id,
    });
    return { delete: true };
  }

  async addProductMenu({
    description,
    id,
    meta_description,
    name,
    price,
    src,
    waiting,
    available,
    category_id,
    meta_title,
  }: TProductMenu & { category_id: string }) {
    const findCategory = await this.categoryProductMenuRepository.findOne({
      where: { category_product_id: category_id },
    });
    if (!findCategory) return { add: false };
    const newProduct = this.productMenuRepository.create({
      available,
      description,
      id,
      meta_description,
      name,
      price,
      src,
      waiting,
      meta_title,
      categoryProductMenu: findCategory,
    });
    await this.productMenuRepository.save(newProduct);
    return { add: true };
  }

  async updateProductMenu({
    available,
    description,
    id,
    meta_description,
    meta_title,
    name,
    price,
    product_id,
    src,
    waiting,
  }: TProductMenu & { product_id: string }) {
    await this.productMenuRepository.update(
      {
        product_id,
      },
      {
        available,
        description,
        id,
        meta_description,
        meta_title,
        name,
        price,
        src,
        waiting,
      },
    );
    return { update: true };
  }

  async deleteProductMenu({ product_id }: { product_id: string }) {
    await this.productMenuRepository.delete({
      product_id,
    });
    return { delete: true };
  }
}
