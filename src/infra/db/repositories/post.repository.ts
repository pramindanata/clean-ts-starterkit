import { AbstractRepository, EntityRepository } from 'typeorm';
import { Pagination, PaginationOptions } from '@/common';
import { PostRepositoryContract } from '@/contract';
import { Post } from '@/domain';
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
      take: limit,
      skip: offset,
    });

    return {
      data: data.map(OrmPostMapper.toDomain),
      total,
    };
  }
}
