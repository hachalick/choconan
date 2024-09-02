import { UploadFileDto } from './menu.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AddProductMenuDto } from './menu.dto';
import { AddCategoryMenuDto } from './menu.dto';
import { MenuService } from './menu.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('upload-file-excel-menu')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'فایل اکسل برای آپلود',
    type: UploadFileDto,
  })
  uploadFileExcel(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1500,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    return this.menuService.uploadFileExcel({ file });
  }

  @Get('get-menu')
  getAllMenu() {
    return this.menuService.getAllMenu();
  }

  @Get('get-menu/:category')
  getCategoryMenu(@Param('category') category: string) {
    return this.menuService.getCategoryMenu({ category });
  }

  @Get('get-menu/:category/:id')
  getOneProductMenu(
    @Param('category') category: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.menuService.getOneProductMenu({
      category,
      id,
    });
  }

  @Get('search/:query')
  searchMenu(@Param('query') query: string) {
    return this.menuService.searchProductMenu({ query });
  }

  @Post('add-category-menu')
  addCategoryMenu(@Body() body: AddCategoryMenuDto) {
    const { category, icon } = body;
    return this.menuService.addCategoryMenu({ category, icon });
  }

  @Put('update-category-menu/:category_id')
  updateCategoryMenu(
    @Param('category_id') category_id: string,
    @Body() body: AddCategoryMenuDto,
  ) {
    const { category, icon } = body;
    return this.menuService.updateCategoryMenu({ category, category_id, icon });
  }

  @Delete('delete-category-menu/:category_id')
  deleteCategoryMenu(@Param('category_id') category_id: string) {
    return this.menuService.deleteCategoryMenu({ category_id });
  }

  @Post('add-product-menu/:category_id')
  addProductMenu(
    @Param('category_id') category_id: string,
    @Body() body: AddProductMenuDto,
  ) {
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
    } = body;
    return this.menuService.addProductMenu({
      available,
      category_id,
      description,
      id,
      meta_description,
      meta_title,
      name,
      price,
      src,
      waiting,
    });
  }

  @Put('update-product-menu/:product_id')
  updateProductMenu(
    @Param('product_id') product_id: string,
    @Body() body: AddProductMenuDto,
  ) {
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
    } = body;
    return this.menuService.updateProductMenu({
      product_id,
      available,
      description,
      id,
      meta_description,
      meta_title,
      name,
      price,
      src,
      waiting,
    });
  }

  @Delete('delete-product-menu/:product_id')
  deleteProductMenu(@Param('product_id') product_id: string) {
    return this.menuService.deleteProductMenu({ product_id });
  }
}
