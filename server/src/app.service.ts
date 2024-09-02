import { Injectable } from '@nestjs/common';
import {
  readFile as readFileExcel,
  utils as utilsExcel,
} from 'xlsx';
import { allCategoryVideos } from './modules/constants/videos';

@Injectable()
export class AppService {
  getAllVideo() {
    const allMenu = [];
    const sheet_name_list = allCategoryVideos.map((val) => val.category);
    const workbook = readFileExcel('src/modules/assets/excel/video.xlsx');
    for (let i = 0; i < sheet_name_list.length; i++) {
      const data: TProductsMenu = utilsExcel.sheet_to_json(
        workbook.Sheets[sheet_name_list[i]],
      );
      allMenu.push({
        category: sheet_name_list[i],
        products: data,
      });
    }
    return allMenu;
  }

  getCategoryVideo({ category }: { category: string }) {
    const categoryAvailable = allCategoryVideos.find(
      (c) => c.category === category,
    );
    if (!categoryAvailable) return {};
    const workbook = readFileExcel('src/modules/assets/excel/video.xlsx');
    const data: TProductsMenu = utilsExcel.sheet_to_json(
      workbook.Sheets[category],
    );
    const res = {
      category,
      products: data,
    };
    return res;
  }

  getCategoryLastVideo({ category }: { category: string }) {
    const categoryAvailable = allCategoryVideos.find(
      (c) => c.category === category,
    );
    if (!categoryAvailable) return {};
    const workbook = readFileExcel('src/modules/assets/excel/video.xlsx');
    const data: TProductsMenu = utilsExcel.sheet_to_json(
      workbook.Sheets[category],
    );
    return data.pop();
  }
}
