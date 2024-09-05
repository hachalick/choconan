import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

export class AddCategoryMenuDto {
  @ApiProperty({ type: String, default: '' })
  category: string;

  @ApiProperty({ type: String, default: '' })
  icon: string;
}

export class AddProductMenuDto {
  @ApiProperty({ type: Number, default: 1 })
  id: number;

  @ApiProperty({ type: Boolean, default: true })
  available: boolean;

  @ApiProperty({ type: Number, default: 0 })
  price: number;

  @ApiProperty({ type: Number, default: 0 })
  waiting: number;

  @ApiProperty({ type: String, default: '' })
  meta_title: string;

  @ApiProperty({ type: String, default: '' })
  meta_description: string;

  @ApiProperty({ type: String, default: '' })
  name: string;

  @ApiProperty({ type: String, default: '' })
  description: string;

  @ApiProperty({ type: String, default: '' })
  src: string;
}
