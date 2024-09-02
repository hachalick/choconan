import { Injectable } from '@nestjs/common';
import { BlogEntity } from './../modules/entity/mysql/Blog.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
  ) {}

  async getListBlog() {
    return await this.blogRepository.find();
  }

  async getBlogById({ id }: { id: string }) {
    return await this.blogRepository.findOne({ where: { blog_id: id } });
  }

  async createBlog() {
    const newBlog = this.blogRepository.create();
    const blog = await this.blogRepository.save(newBlog);
    return { create: true, id: blog.blog_id };
  }

  async updateBlog({ id, body }: { id: string; body: TBlog }) {
    const { blog, meta_title, short_description, src_banner, title, publish } =
      body;
    await this.blogRepository.update(
      { blog_id: id },
      { blog, meta_title, short_description, src_banner, title, publish },
    );
    return { update: true };
  }

  async deleteBlog({ id }: { id: string }) {
    await this.blogRepository.delete(id);
    return { delete: true };
  }

  async setPublishBlog({ id, publish }: { id: string; publish: boolean }) {
    await this.blogRepository.update({ blog_id: id }, { publish });
    return { update: true };
  }
}
