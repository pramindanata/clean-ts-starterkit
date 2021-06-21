import { AbstractRepository, EntityRepository } from 'typeorm';
import { Pagination, PaginationOptions } from '@/common';
import { PostRepositoryContract } from '@/contract';
import { CreatePostProps, Post } from '@/domain';
import { OrmPost, OrmPostMapper } from '../entities';

@EntityRepository(OrmPost)
export class PostRepository
  extends AbstractRepository<OrmPost>
  implements PostRepositoryContract
{
  async getPagination(options: PaginationOptions): Promise<Pagination<Post>> {
    const { limit, page } = options;
    const offset = (page - 1) * limit;
    const [data, total] = await this.repository.findAndCount({
      select: ['id', 'title', 'content', 'createdAt'],
      relations: ['author'],
      take: limit,
      skip: offset,
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      data: data.map(OrmPostMapper.toDomain),
      total,
    };
  }

  async create(props: CreatePostProps): Promise<Post> {
    const { author, content, title } = props;
    const post = await this.repository.save({
      title,
      content,
      author,
    });

    return OrmPostMapper.toDomain(post);
  }

  async getDetail(id: string): Promise<Post | undefined> {
    const post = await this.repository.findOne(id, {
      relations: ['author'],
    });

    return post && OrmPostMapper.toDomain(post);
  }
}
