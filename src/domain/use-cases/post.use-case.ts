import { Pagination, PaginationOptions } from '@/common';
import { PostRepositoryContract } from '@/contract';
import { Post } from '../entities';

export class PostUseCase {
  constructor(private postRepo: PostRepositoryContract) {}

  async getPagination(options: PaginationOptions): Promise<Pagination<Post>> {
    const pagination = await this.postRepo.getPagination(options);

    return pagination;
  }
}
