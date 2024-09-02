import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SetPublishBlogDto } from './blog.dto';
import { SaveLocallyBlogDto } from './blog.dto';
import { BlogService } from './blog.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('get-list-blog')
  getListBlog() {
    return this.blogService.getListBlog();
  }

  @Get('get-blog/:id')
  getBlogById(@Param('id') id: string) {
    return this.blogService.getBlogById({ id });
  }

  @Post('create-blog')
  createBlog() {
    return this.blogService.createBlog();
  }

  @Put('update-blog/:id')
  updateBlog(@Param('id') id: string, @Body() body: SaveLocallyBlogDto) {
    const { blog, meta_title, short_description, src_banner, title, publish } =
      body;
    return this.blogService.updateBlog({
      id,
      body: { blog, meta_title, short_description, src_banner, title, publish },
    });
  }
  
    @Delete('delete-blog/:id')
    async deleteBlog(@Param('id') id: string) {
      return await this.blogService.deleteBlog({ id });
    }

  @Put('set-publish-blog/:id')
  setPublishBlog(@Param('id') id: string, @Body() body: SetPublishBlogDto) {
    const { publish } = body;
    return this.blogService.setPublishBlog({ id, publish });
  }
}
