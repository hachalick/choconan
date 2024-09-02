import { ApiProperty } from '@nestjs/swagger';

export class SaveLocallyBlogDto {
  @ApiProperty({ type: String, default: '' })
  meta_title: string;

  @ApiProperty({ type: Boolean, default: false })
  publish: boolean;

  @ApiProperty({ type: String, default: '' })
  short_description: string;

  @ApiProperty({ type: String, default: '' })
  title: string;

  @ApiProperty({ type: String, default: '' })
  src_banner: string;

  @ApiProperty({ type: String, default: '' })
  blog: string;
}

export class SetPublishBlogDto {
  @ApiProperty({ type: Boolean, default: false })
  publish: boolean;
}
